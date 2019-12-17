import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { AuthRoutingModule } from './auth-routing/auth-routing.module';
import { FormsModule } from '@angular/forms';
import { AuthStartComponent } from './auth-start/auth-start.component';

@NgModule({
  declarations: [RegisterComponent, LoginComponent, ResetPasswordComponent, AuthStartComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule
  ]
})
export class AuthModule { }
