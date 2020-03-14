import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IApplication } from '../models';
import { ApplicationService } from '../application.service';
import { APPLICATION_CREATE, APPLICATION_EDIT, APPLICATION_READ, APPLICATION_DELETE } from '../../permissions.const';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-list-application',
  templateUrl: './list-application.component.html',
  styleUrls: ['./list-application.component.scss']
})
export class ListApplicationComponent implements OnInit {
  appFormUP: boolean = false;
  hasCreatAppPermission: boolean;
  hasReadAppPermission: boolean;
  hasEditAppPermission: boolean;
  hasDeleteAppPermission: boolean;

  applications: IApplication[];
  fetchedApp: IApplication;
  editMode: boolean = false;
  isLoading: boolean;
  constructor(private appService: ApplicationService, private authService: AuthService) { }

  ngOnInit() {
    this.checkPermissions();
    this.getApplications();
  }

  getApplications() {
    this.isLoading = true;
    this.appService.getApplications().subscribe(res => {
      this.applications = res;
      this.isLoading = false;
    },
      errorResponse => {
        // this.errorMessage = errorResponse.error.message || 'UNKNOWN_ERROR';
      });
  }
  reFetchApps() {
    this.getApplications();
    this.closeAppForm();
  }
  deleteApp(id) {
    this.checkDeleteAppPermision();
    if (this.hasDeleteAppPermission) {
      if (confirm('Are you sure you want to delete?')) {
        this.appService.deleteApplication(id).subscribe(res => {
          this.applications = this.applications.filter(f => f.id !== id)
        },
          errorResponse => {
            // this.errorMessage = errorResponse.error.message || 'UNKNOWN_ERROR';
          });
      }
    } else {
      alert("You don't have DELETE Permission")
    }

  }
  fetchAppForEditApp(id) {
    this.checkEditAppPermision();
    if (this.hasEditAppPermission) {
      this.closeAppForm();
      this.appService.getApplication(id).subscribe(res => {
        this.fetchedApp = res;
        this.editMode = true;
        this.openAppForm();
      },
        errorResponse => {
          // this.errorMessage = errorResponse.error.message || 'UNKNOWN_ERROR';
        });
    } else {
      alert("You don't have EDIT Permission");
    }

  }

  // check if user have required permission
  checkPermissions() {
    this.checkCreatAppPermision();
    this.checkEditAppPermision();
    this.checkReadAppPermision();
    this.checkDeleteAppPermision();
  }
  checkCreatAppPermision() {
    const config = [];
    config.push(APPLICATION_CREATE);
    this.authService.hasPermission(config)
      .subscribe(hasPermission => {
        return this.hasCreatAppPermission = hasPermission
      })
  }
  checkEditAppPermision() {
    const config = [];
    config.push(APPLICATION_EDIT);
    this.authService.hasPermission(config)
      .subscribe(hasPermission => {
        return this.hasEditAppPermission = hasPermission
      })
  }
  checkReadAppPermision() {
    const config = [];
    config.push(APPLICATION_READ);
    this.authService.hasPermission(config)
      .subscribe(hasPermission => {
        return this.hasReadAppPermission = hasPermission
      })
  }
  checkDeleteAppPermision() {
    const config = [];
    config.push(APPLICATION_DELETE);
    this.authService.hasPermission(config)
      .subscribe(hasPermission => {
        return this.hasDeleteAppPermission = hasPermission
      })
  }
  openAppForm() {
    this.appFormUP = true;
  }
  closeAppForm() {
    this.appFormUP = false;
    this.editMode = false;
  }
}
