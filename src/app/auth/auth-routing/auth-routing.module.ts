import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from '../register/register.component';
import { LoginComponent } from '../login/login.component';
import { ResetPasswordComponent } from '../reset-password/reset-password.component';
import { AuthStartComponent } from '../auth-start/auth-start.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'login'},
  {path: '', component: AuthStartComponent, children: [
    {path: 'register', component: RegisterComponent},
    {path: 'login', component: LoginComponent},
    {path: 'reset-password', component: ResetPasswordComponent}
  ]},
];


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
