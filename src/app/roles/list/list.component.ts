import { RolesService } from './../roles.services';
import { Component, OnInit } from '@angular/core';
import { IRole } from '../models';
import { AuthService } from 'src/app/auth/auth.service';
import { ROLE_CREATE, ROLE_READ, ROLE_DELETE, ROLE_EDIT } from '../../dashboard/permissions.const'

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  roleFormUP: boolean = false;
  hasCreatRolePermission: boolean;
  hasReadRolePermission: boolean;
  hasEditRolePermission: boolean;
  hasDeleteRolePermission: boolean;

  roles: IRole[];
  fetchedRole: IRole;
  editMode: boolean;
  isLoading: boolean = false;

  constructor(private roleService: RolesService, private authService: AuthService) { }

  ngOnInit() {
    this.checkPermissions();
    this.getRoles();
  }

  getRoles() {
    this.isLoading = true;
    this.roleService.getRoles().subscribe(res => {
      this.roles = res;
      this.isLoading = false;
    },
      errorResponse => {
        // this.errorMessage = errorResponse.error.message || 'UNKNOWN_ERROR';
      });
  }

  fetchRoleForEditing(title) {
    this.checkEditRolePermision();
    if (this.hasEditRolePermission) {
      this.closeRoleForm();
      this.roleService.getRole(title).subscribe(res => {
        this.fetchedRole = res;
        this.editMode = true;
        this.openRoleForm();
      },
        errorResponse => {
          // this.errorMessage = errorResponse.error.message || 'UNKNOWN_ERROR';
        });
    } else {
      alert("You don't have EDIT Permission")
    }


  }

  deleteRole(title) {
    this.checkDeleteRolePermision();
    if (this.hasDeleteRolePermission) {
      if (confirm('Are you sure you want to delete?')) {
        this.roleService.deleteRole(title).subscribe(res => {
          this.roles = this.roles.filter(f => f.title !== title)
        },
          errorResponse => {
            // this.errorMessage = errorResponse.error.message || 'UNKNOWN_ERROR';
          });
      }
    } else {
      alert("You don't have DELETE Permission")
    }
  }

  reFetchRoles() {
    this.getRoles();
    this.closeRoleForm();
  }



  // check if user have required permission
  checkPermissions() {
    this.checkCreateRolePermision();
    this.checkEditRolePermision();
    this.checkReadRolePermision();
    this.checkDeleteRolePermision();
  }
  checkCreateRolePermision() {
    const config = [];
    config.push(ROLE_CREATE);
    this.authService.hasPermission(config)
      .subscribe(hasPermission => {
        return this.hasCreatRolePermission = hasPermission
      })
  }
  checkEditRolePermision() {
    const config = [];
    config.push(ROLE_EDIT);
    this.authService.hasPermission(config)
      .subscribe(hasPermission => {
        return this.hasEditRolePermission = hasPermission
      })
  }
  checkReadRolePermision() {
    const config = [];
    config.push(ROLE_READ);
    this.authService.hasPermission(config)
      .subscribe(hasPermission => {
        return this.hasReadRolePermission = hasPermission
      })
  }
  checkDeleteRolePermision() {
    const config = [];
    config.push(ROLE_DELETE);
    this.authService.hasPermission(config)
      .subscribe(hasPermission => {
        return this.hasDeleteRolePermission = hasPermission
      })
  }


  openRoleForm() {
    this.roleFormUP = true;
  }
  closeRoleForm() {
    this.roleFormUP = false;
    this.editMode = false;
  }

}
