import {Component} from '@angular/core';
import {LoadingService} from '@loading-service';

@Component({
  selector: 'app-loading',
  template: `
    <ngx-loading [show]="(loadingService.loading$ | async)"></ngx-loading>
  `
})
export class LoadingComponent {

  constructor(public loadingService: LoadingService) { }

}
