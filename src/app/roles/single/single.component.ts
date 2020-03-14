import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { IRole } from '../models';
import { RolesService } from '../roles.services';

@Component({
  selector: 'role-single',
  templateUrl: './single.component.html',
  styleUrls: ['./single.component.scss']
})
export class SingleComponent implements OnInit {
  @Output() deleteRole = new EventEmitter<boolean>();
  @Output() editRole = new EventEmitter<boolean>();
  @Input() role: IRole;
  @Input() hasEditRolePermission: boolean;
  @Input() hasDeleteRolePermission: boolean;
  constructor(private roleService: RolesService) { }

  ngOnInit() {

  }

  EmitDeleteRole(title) {
    this.deleteRole.emit(title);
  }
  EmitEditRole(title) {
    this.editRole.emit(title);
  }

}
