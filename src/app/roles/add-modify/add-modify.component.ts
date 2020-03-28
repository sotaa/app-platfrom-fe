import {
  Component,
  OnInit,
  ViewChild,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { IRole, Role } from '../models';
import { RolesService } from '../roles.services';
import { Options } from 'select2';
import { AuthService } from 'src/app/auth/auth.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-add-modify',
  templateUrl: './add-modify.component.html',
  styleUrls: ['./add-modify.component.scss']
})
export class AddModifyComponent implements OnInit {
  @ViewChild('f') form: NgForm;
  @Output() closeRoleForm = new EventEmitter<boolean>();
  @Output() reFetchRoles = new EventEmitter<boolean>();
  @Input() fetchedRole: IRole;
  @Input() editMode: boolean;
  @Input() hasCreatRolePermission: boolean;
  @Input() hasEditRolePermission: boolean;
  title: string;
  permissions: string[];
  role: IRole;
  isLoading: boolean;
  errorMessage: string;
  public select2Options: Options;
  fetchedPermissions: string[] = [];
  currentUserRole: IRole;

  constructor(private roleService: RolesService, private authService: AuthService) {
    this.role = new Role();
  }

  ngOnInit() {
    if (this.editMode) {
      this.title = this.fetchedRole.title;
      this.permissions = this.fetchedRole.permissions;
    } else { }

    this.getUserPermissions();
    this.select2Options = {
      width: '100%',
      multiple: true,
      theme: "bootstrap"
    };
  }

  submit() {
    this.fillRoleDataForSendingToServer();
    if (this.form.valid) {
      this.isLoading = true;
      let request;
      if (this.hasCreatRolePermission) {
        request = this.roleService.createRole(this.role);
      }
      if (this.editMode) {
        if (this.hasEditRolePermission) {
          request = this.roleService
            .editRole(this.role, this.fetchedRole.title);
        }
      }
      request.pipe(finalize(() => this.isLoading = false)).subscribe(res => {
        alert(`Role is ${this.editMode ? `updated` : `created`}`);
        this.reFetchRoles.emit();
      },
        errorResponse => {
          this.errorMessage = errorResponse.error.message || 'UNKNOWN_ERROR';
        }
      );

    } else {
      this.errorMessage = 'VALIDATION_ERROR';
    }
  }

  getUserPermissions(): any {
    this.authService.getCurrentUser().subscribe((authResult: any) => {
      this.fetchedPermissions = authResult.user.role.permissions;
      this.currentUserRole = authResult.user.role;
    });


  }

  fillRoleDataForSendingToServer() {
    this.role.title = this.title
    this.role.permissions = this.permissions;
    this.role.parent = this.currentUserRole;
  }

  emitCloseRoleForm() {
    this.closeRoleForm.emit();
  }

}
