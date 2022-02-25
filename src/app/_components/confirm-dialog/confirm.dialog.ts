import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IConfirmDialogConfig } from '@app_models/_common/IConfirmDialogConfig';

@Component({
  selector: 'app-confim-dialog',
  template: `
    <div class="shadow">
      <h2>{{data.title}}</h2>
      <hr>

      <div class="row">
        <div class="col-md-12">
          <p>{{data.message}}</p>
        </div>
      </div>

      <hr />
      <div class="d-flex">
        <button mat-raised-button color="warn" [mat-dialog-close]="true">
            {{ data.submitBtnMessage }}
          </button>
        <button mat-raised-button color="primary" class="mat-success ml-2" [mat-dialog-close]="false">
            {{ data.cancelBtnMessage }}
        </button>
      </div>

    </div>
  `
})
export class ConfirmDialog implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: IConfirmDialogConfig) { }

  ngOnInit(): void {
  }

}
