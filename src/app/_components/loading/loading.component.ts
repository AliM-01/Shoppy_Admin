import { Component, OnInit } from '@angular/core';
import { LoadingService } from '@app_services/common/loading/loading.service';

@Component({
  selector: 'app-loading',
  template: `
    <ngx-loading [show]="(loadingService.loading$ | async)"></ngx-loading>
  `
})
export class LoadingComponent implements OnInit {

  constructor(public loadingService: LoadingService) { }
  ngOnInit(): void {
  }

}
