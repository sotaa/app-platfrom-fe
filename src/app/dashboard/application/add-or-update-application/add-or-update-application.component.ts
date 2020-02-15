import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ViewChild
} from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-or-update-application',

  templateUrl: './add-or-update-application.component.html',
  styleUrls: ['./add-or-update-application.component.scss']
})
export class AddOrUpdateApplicationComponent implements OnInit {
  @ViewChild('f') form: NgForm;
  name: string;
  address: string;
  active: boolean;
  isLoading: boolean;
  @Output() closeAppForm = new EventEmitter<boolean>();
  constructor() {}

  ngOnInit() { }

  emitCloseAppForm() {
    this.closeAppForm.emit();
  }
}
