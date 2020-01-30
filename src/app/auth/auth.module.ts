import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { AuthRoutingModule } from './auth-routing/auth-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthStartComponent } from './auth-start/auth-start.component';
import { TranslateModule } from '@ngx-translate/core';
import { PoliciesComponent } from './policies/policies.component';
import { StoreModule } from '@ngrx/store';
import { authReducer } from './reducers';

@NgModule({
  declarations: [RegisterComponent, LoginComponent, ResetPasswordComponent, AuthStartComponent, PoliciesComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    StoreModule.forRoot({
      authState: authReducer
    })
  ]
})
export class AuthModule { }
