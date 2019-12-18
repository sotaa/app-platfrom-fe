import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  @ViewChild('f') form: NgForm;

  username: string;
  password: string;
  remember: boolean;
  isLoading: boolean;
  errorMessage: string;

  constructor(private router: Router, private authService: AuthService) {}

  submit() {
    if (this.form.valid) {
      this.isLoading = true;
      this.authService
        .login(this.username, this.password)
        .pipe(finalize(() => this.isLoading = false))
        .subscribe(
          res => {
            // make user remember.
            if (this.remember) {
              this.authService.rememberCurrentUser();
            }

            // navigate to dashboard.
            this.router.navigate(['']);
          },
          errorResponse => {
            this.errorMessage = errorResponse.error.message || 'UNKNOWN_ERROR';
          }
        );
    } else {
      this.errorMessage = 'VALIDATION_ERROR';
    }
  }
}
