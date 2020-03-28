import {
  Component,
  OnInit,
  ViewChild,
  Output,
  EventEmitter,
  Input
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Options } from 'select2';
import { AuthService } from './../../auth/auth.service';
import { IUser, User } from '../models';
import { IAuthData, AuthData } from './../../auth/models/auth-data.interface';
import { finalize } from 'rxjs/operators';
import { RolesService } from 'src/app/roles/roles.services';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'user-add-modify',
  templateUrl: './add-modify.component.html',
  styleUrls: ['./add-modify.component.scss']
})
export class AddModifyComponent implements OnInit {
  @ViewChild('f') form: NgForm;
  @Output() closeUserForm = new EventEmitter<boolean>();
  @Input() user;
  @Input() editMode: boolean;
  @Input() hasEditUserPermission: boolean
  @Input() hasCreatUserPermission: boolean;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  gender: 'MALE' | 'FEMALE';
  mobile: string;
  role: string;
  isActive: boolean;
  public select2Options: Options;

  fetchedRoles: string[] = [];
  isLoading: boolean;
  errorMessage: string;
  authData: IAuthData;
  userData: IUser;


  constructor(private authService: AuthService, private userService: UserService, private roleService: RolesService, private router: Router) {
    this.authData = new AuthData();
    this.userData = new User();
  }
  ngOnInit() {
    if (this.editMode) {
      if (this.user) {
        this.email = this.user.email;
        this.password = "";
        this.firstName = this.user.firstName;
        this.lastName = this.user.lastName;
        this.mobile = this.user.mobile;
        // this.isActive = this.user.isActive;
        this.gender = this.user.gender;
        this.role = this.user.role.title
      }
    } else {
      this.email = "";
      this.password = "";
    }
    document.getElementById('modalUp').click();
    this.getRoles();
    this.select2Options = {
      width: '100%',
      multiple: false,
      theme: 'bootstrap',
    };
  }

  async submit() {
    this.fillUserDataForSendingToServer();
    if (this.form.valid) {
      this.isLoading = true;
      if (this.editMode) {
        // Edit User
        if (this.hasEditUserPermission) {
          const EditRequest = await this.userService.updateUserInfo(this.user.id, this.userData);
          EditRequest.pipe(finalize(() => {
            this.isLoading = false;
            document.getElementById('modalUp').click();
            this.router.navigate(['/users']);
          })).subscribe(res => {
            alert(`User is ${this.editMode ? `updated` : `created`}`);

          }, errorResponse => { this.errorMessage = errorResponse.error.message || 'UNKNOWN_ERROR' })
        }
      }
      else {
        // Create User
        if (this.hasCreatUserPermission) {
          const request = await this.authService.registerByAdmin(this.authData);
          request.subscribe(async (res) => {
            if (this.userData) {
              const req = await this.userService.updateUserInfo(res.user.id, this.userData);
              req.pipe(finalize(() => {
                this.isLoading = false;
                document.getElementById('modalUp').click();
                this.router.navigate(['/users']);
              })).subscribe(res => res, errorResponse => { this.errorMessage = errorResponse.error.message || 'UNKNOWN_ERROR' })
            }
            alert(`User is ${this.editMode ? `updated` : `created`}`);

          },
            errorResponse => {
              this.errorMessage = errorResponse.error.message || 'UNKNOWN_ERROR';
            }
          );
        }
      }
    } else { this.errorMessage = 'VALIDATION_ERROR'; }
  }

  async getRoles() {
    const res = await this.roleService.getRoles().toPromise();
    let resRoles = [];
    res.map(m => {
      return resRoles.push(m.title);
    });
    this.fetchedRoles = resRoles;
  }

  fillUserDataForSendingToServer() {
    this.firstName ? this.userData.firstName = this.firstName : this.userData.firstName = "";
    this.lastName ? this.userData.lastName = this.lastName : this.userData.lastName = "";
    this.userData.gender = this.gender;
    this.mobile ? this.userData.mobile = this.mobile : this.userData.mobile = "";
    this.role ? this.userData.role = this.role : this.userData.role = "";
    // this.userData.isActive = this.isActive;

    this.authData.username = this.email;
    this.authData.password = this.password;
  }

  emitCloseUserForm() {
    this.closeUserForm.emit();
  }
}
