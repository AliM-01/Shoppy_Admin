import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
    selector: 'app-not-found',
    template: `
  <body>
        <div id="preloader">
            <div class="canvas">
                <img src="assets/img/logo.png" alt="logo" class="loader-logo">
                <div class="spinner"></div>
            </div>
        </div>
        <div class="container-fluid no-padding h-100">
            <div class="row justify-content-center align-items-center h-100">
                <div class="col-xl-4 col-lg-4 no-padding d-flex justify-content-center">
                    <div class="error-02 mx-auto mb-3 text-center">
                        <h1 class="text-gradient-03">404</h1>
                        <h2>صفحه مورد نظر پیدا نشد!</h2>
                        <a (click)="goBack()" class="btn btn-gradient-01 text-white">
                            برگشت به عقب
                        </a>
                    </div>
                </div>
                <div class="col-xl-8 col-lg-8 d-none d-sm-block no-padding">
                    <div class="seenboard-bg bg-error-02">
                    </div>
                </div>
            </div>
        </div>
    </body>
  `
})
export class NotFoundPage {

    constructor(private location: Location) { }

    goBack() {
        this.location.back();
    }

}
