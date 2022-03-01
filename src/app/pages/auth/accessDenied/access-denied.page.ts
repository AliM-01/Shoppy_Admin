import { Location } from '@angular/common';
import { Component } from '@angular/core';

@Component({
    selector: 'auth-accessDenied',
    templateUrl: './access-denied.page.html'
})
export class AccessDeniedPage {

    constructor(private location: Location) { }
    
    goBack() {
        this.location.back();
    }
}
