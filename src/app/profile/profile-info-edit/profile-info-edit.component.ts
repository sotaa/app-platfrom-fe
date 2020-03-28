import { Router } from '@angular/router';
import { UserService } from '../../user/user.service';
import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  Input,
  ViewChild
} from '@angular/core';
import { IUser, User } from '../../user/models';
import { NgForm } from '@angular/forms';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-profile-info-edit',
  templateUrl: './profile-info-edit.component.html',
  styleUrls: ['./profile-info-edit.component.scss']
})
export class ProfileInfoEditComponent implements OnInit {
  email: string;
  firstName: string;
  lastName: string;
  gender: 'MALE' | 'FEMALE';
  mobile: string;
  isLoading: boolean;
  errorMessage: string;
  userData: IUser;
  @Output() closeUserForm = new EventEmitter<boolean>();
  @Input() user;
  @ViewChild('f') form: NgForm;

  constructor(private userService:UserService,private router:Router) {
    this.userData = new User();
  }

  ngOnInit() {
    this.email = this.user.email;
    this.firstName = this.user.firstName;
    this.lastName = this.user.lastName;
    this.gender = this.user.gender;
    this.mobile = this.user.mobile;
  }

  submit() {
    this.fillUserDataForSendingToServer();
    if (this.form.valid) {
      this.isLoading = true;
      const req = this.userService.updateUserInfo(this.user.id, this.userData);
      req.pipe(finalize(() => {
        this.isLoading = false;
        this.emitCloseUserForm();
        this.router.navigate([`/profile/${this.user.id}`]);
      })).subscribe(res=>{alert(`User is updated`);},errorResponse => { this.errorMessage = errorResponse.error.message || 'UNKNOWN_ERROR' })
     } else {
      this.errorMessage = 'VALIDATION_ERROR';
    }
  }

  fillUserDataForSendingToServer() {
    this.firstName ? this.userData.firstName = this.firstName : this.userData.firstName="";
    this.lastName ? this.userData.lastName = this.lastName : this.userData.lastName ="";
    this.userData.gender = this.gender;
    this.mobile ? this.userData.mobile = this.mobile : this.userData.mobile ="";
    this.userData.role = this.user.role.title;
  }


  emitCloseUserForm() {
    this.closeUserForm.emit();
  }
}
