import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IsAuthenticatedGuard } from './guard/is-authenticated.guard';
import { HasPermissionGuard } from './guard/has-permission.guard';
import { AuthStartComponent } from './auth/auth-start/auth-start.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { PoliciesComponent } from './auth/policies/policies.component';

const routes: Routes = [
  {
    path: 'auth', children: [
      { path: '', pathMatch: 'full', redirectTo: 'login' },
      {
        path: '',
        component: AuthStartComponent,
        children: [
          { path: 'register', component: RegisterComponent },
          { path: 'login', component: LoginComponent },
          { path: 'reset-password', component: ResetPasswordComponent },
          { path: 'policies', component: PoliciesComponent }
        ]
      }]
  },
  {
    path: '',
    canActivate: [IsAuthenticatedGuard],
    canActivateChild: [HasPermissionGuard],
    loadChildren: './dashboard/dashboard.module#DashboardModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
