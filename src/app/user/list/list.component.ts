import { Subscription } from 'rxjs';
import { UserService } from './../user.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { IUser } from '../models';
import { AuthService } from 'src/app/auth/auth.service';
import { USER_CREATE, USER_READ, USER_DELETE, USER_EDIT } from '../../dashboard/permissions.const'
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'user-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit,OnDestroy {
  users: IUser[];
  user: IUser;
  editMode: boolean;
  modalUp: boolean;
  isLoading: boolean;
  hasReadUserPermission: boolean;
  hasCreatUserPermission: boolean;
  hasEditUserPermission: boolean;
  hasDeleteUserPermission: boolean;
  navigationSubscription:Subscription

  constructor(private userService: UserService, private authService: AuthService,private router: Router) {
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        this.initValues();
      }
    });
   }

  ngOnInit() {

  }
  initValues() {
    this.closeUserForm()
    this.checkPermissions();
    this.isLoading = true;
    this.fetchUsers();
  }

  fetchUsers() {
    this.userService.getUsers().subscribe(res => {
      this.users = res;
      this.isLoading = false;
    },
      errorResponse => {
        console.log(errorResponse.error.message)
        alert(`Action is ${errorResponse.error.message}`);
        this.router.navigate(['/']);
      })
}

  fetchUser(id) {
    if (this.hasEditUserPermission) {
      this.userService.getUser(id).subscribe(res => {
        this.user = res;
        this.editMode = true;
        this.openUserForm();
      },
      errorResponse => {
        console.log(errorResponse.error.message)
        alert(`Action is ${errorResponse.error.message}`);
        this.router.navigate(['/']);
      })
    }

  }

  goToUserProfile(id) {
    this.router.navigate([`/profile/${id}`]);
  }

  // check if user have required permission
  checkPermissions() {
    this.checkCreateUserPermision();
    this.checkEditUserPermision();
    this.checkReadUserPermision();
    this.checkDeleteUserPermision();
  }
  checkCreateUserPermision() {
    const config = [];
    config.push(USER_CREATE);
    this.authService.hasPermission(config)
      .subscribe(hasPermission => {
        return this.hasCreatUserPermission = hasPermission
      })
  }
  checkEditUserPermision() {
    const config = [];
    config.push(USER_EDIT);
    this.authService.hasPermission(config)
      .subscribe(hasPermission => {
        return this.hasEditUserPermission = hasPermission
      })
  }
  checkReadUserPermision() {
    const config = [];
    config.push(USER_READ);
    this.authService.hasPermission(config)
      .subscribe(hasPermission => {
        return this.hasReadUserPermission = hasPermission
      })
  }
  checkDeleteUserPermision() {
    const config = [];
    config.push(USER_DELETE);
    this.authService.hasPermission(config)
      .subscribe(hasPermission => {
        return this.hasDeleteUserPermission = hasPermission
      })
  }

  openUserForm() {
    this.modalUp = true;
  }
  closeUserForm() {
    this.modalUp = false;
    this.editMode = false;
  }

  ngOnDestroy() {
    this.navigationSubscription.unsubscribe();
  }
}
