import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  form: FormGroup;
  errorMessage: string;
  isLoading = false;

  constructor(private router: Router, private authService: AuthService) {
    this.form = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(/^.{6,}$/)
      ]),
      remember: new FormControl(false),
      fullname: new FormControl('', Validators.pattern(/^$/)),
      policyAgreement: new FormControl(true, Validators.requiredTrue)
    });
  }

  submit() {
    if (this.form.valid && !this.form.value.fullname) {
      this.isLoading = true;
      this.authService
        .register(this.form.value.username, this.form.value.password)
        .pipe(finalize(() => (this.isLoading = false)))
        .subscribe(
          res => {
            // make user remember.
            if (this.form.value.remember) {
              this.authService.rememberCurrentUser();
            }

            // navigate to dashboard.
            this.router.navigate(['']);
          },
          errorResponse => {
            if (errorResponse.error instanceof Array) {
              this.form.controls.username.setErrors(
                errorResponse.error.find(e => e.field === 'username')!.errors
              );

              console.log(this.form.controls.username.errors);
            } else {
              this.errorMessage =
                errorResponse.error.message || 'UNKNOWN_ERROR';
            }
          }
        );
    }
  }
}
