import { Component, OnInit } from '@angular/core';
import { LoadingService } from '../../_services/common/loading/loading.service';

@Component({
  selector: 'app-loading',
  template: `
    <div class="spinner-container" *ngIf="(loadingService.loading$ | async)">
        <mat-spinner></mat-spinner>
    </div>
  `
})
export class LoadingComponent implements OnInit {

  constructor(public loadingService: LoadingService) { }

  ngOnInit(): void {
  }

}
