import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ViewEncapsulation,
  Output,
  EventEmitter
} from '@angular/core';
import { DatatableComponent, ColumnMode } from '@swimlane/ngx-datatable';
@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GridComponent implements OnInit {
  @Input() users;
  @Input() hasEditUserPermission: boolean;
  @Input() hasDeleteUserPermission: boolean;
  @Output() editUser = new EventEmitter<boolean>();
  @Output() userInfo = new EventEmitter<boolean>();
  rows = [];
  temp = [];

  @ViewChild(DatatableComponent) table: DatatableComponent;
  ColumnMode = ColumnMode;

  constructor() {
    this.fetch(data => {
      // cache our list
      this.temp = [...this.users];

      // push our inital complete list
      this.rows = this.users;
    });
  }

  ngOnInit() {
  }

  fetch(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', `assets/data/company.json`);

    req.onload = () => {
      cb(JSON.parse(req.response));
    };

    req.send();
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    // filter our data
    const temp = this.temp.filter(function (d) {
      !d.firstName ? d.firstName = "" : d.firstName;
      !d.lastName ? d.lastName = "" : d.lastName;
      !d.gender ? d.gender = "" : d.gender;
      return (
        d.firstName.toLowerCase().indexOf(val) !== -1 || !val
        ||
        d.gender.toLowerCase().indexOf(val) !== -1 || !val
        ||
        d.lastName.toLowerCase().indexOf(val) !== -1 || !val
        ||
        d.email.toLowerCase().indexOf(val) !== -1 || !val
        ||
        d.role.title.toLowerCase().indexOf(val) !== -1 || !val
      );
    });

    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

  emitEditUser(id) {
    this.editUser.emit(id);
  }
  emitUserInfo(id) {
    this.userInfo.emit(id);
  }

}
