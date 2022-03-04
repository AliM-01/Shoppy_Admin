import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@app_services/auth/auth.service';
import { checkFormGroupErrors } from '@app_services/_common/functions/functions';
import { LoadingService } from '@app_services/_common/loading/loading.service';
import { ToastrService } from 'ngx-toastr';
import { LoginRequestModel } from '@app_models/auth/login-request';

@Component({
  selector: 'auth-login',
  templateUrl: './login.page.html'
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;
  returnUrl: string | null = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private loading: LoadingService,
    private authService: AuthService,
    private toastr: ToastrService
  ) {
  }

  ngOnInit() {
    this.loading.loadingOn();

    this.authService.logout(false);

    this.returnUrl = this.activatedRoute.snapshot.queryParams["returnUrl"];

    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),
      rememberMe: new FormControl(false)
    });

    this.loading.loadingOff();

  }

  checkError(controlName: string, errorName: string): boolean {
    return checkFormGroupErrors(this.loginForm, controlName, errorName)
  }

  submitForm() {
    this.loading.loadingOn();

    if (this.loginForm.valid) {
      const loginData = new LoginRequestModel(
        this.loginForm.controls.email.value,
        this.loginForm.controls.password.value,
        (this.loginForm.controls.rememberMe.value as boolean),
      );

      this.authService.login(loginData)
        .subscribe(isLoggedIn => {

          console.log(isLoggedIn);

          if (isLoggedIn) {
            if (this.returnUrl) {
              this.router.navigate([this.returnUrl]);
            } else {
              this.router.navigate(["/"]);
            }
          }

        });


    } else {
      this.loginForm.markAllAsTouched();
    }

    this.loading.loadingOff();

  }
}
