import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
  Input,
  OnDestroy
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApplicationService } from '../application.service';
import { Application, IApplication } from '../models/application.interface';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-add-or-update-application',

  templateUrl: './add-or-update-application.component.html',
  styleUrls: ['./add-or-update-application.component.scss']
})
export class AddOrUpdateApplicationComponent implements OnInit {
  @ViewChild('f') form: NgForm;
  @Output() closeAppForm = new EventEmitter<boolean>();
  @Output() reFetchApplications = new EventEmitter<boolean>();
  name: string;
  address: string;
  active: boolean;
  isLoading: boolean;
  application: IApplication;
  @Input() fetchedApp: IApplication;
  @Input() editMode: boolean;
  @Input() hasEditAppPermission: boolean;
  @Input() hasCreatAppPermission: boolean;
  errorMessage: string;

  constructor(private applicationService: ApplicationService) {
    this.application = new Application();
  }

  ngOnInit() {
    if (this.editMode) {
      this.name = this.fetchedApp.name;
      this.address = this.fetchedApp.url;
      this.active = this.fetchedApp.isActive;
    }
  }

  submit() {
    this.fillApplicationDataForSendingToServer();
    if (this.form.valid) {
      this.isLoading = true;
      let request;
      if (this.hasCreatAppPermission) {
        request = this.applicationService
          .createApplication(this.application);
      }

      if (this.editMode) {
        if (this.hasEditAppPermission) {
          request = this.applicationService
            .editApplication(this.application, this.fetchedApp.id);
        }

      }
      request.pipe(finalize(() => this.isLoading = false)).subscribe(res => {
        alert(`Application is ${this.editMode ? `updated` : `created`}`);
        this.reFetchApplications.emit();
      },
        errorResponse => {
          this.errorMessage = errorResponse.error.message || 'UNKNOWN_ERROR';
        }
      );
    } else {
      this.errorMessage = 'VALIDATION_ERROR';
    }
  }

  fillApplicationDataForSendingToServer() {
    this.application.name = this.name;
    this.application.url = this.address;
    this.application.isActive = this.active
  }
  emitCloseAppForm() {
    this.closeAppForm.emit();
  }

}
