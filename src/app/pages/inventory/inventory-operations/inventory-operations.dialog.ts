import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { InventoryOperationModel } from '@app_models/inventory/inventory-operation';
import { InventoryService } from '@app_services/inventory/inventory.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-product-category',
  templateUrl: './inventory-operations.dialog.html'
})
export class InventoryOperationDialog implements OnInit {

  operationLogs: InventoryOperationModel[] = [];

  constructor(
    public dialogRef: MatDialogRef<InventoryOperationDialog>,
    @Inject(MAT_DIALOG_DATA) public data: {id: number},
    private inventoryService: InventoryService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.inventoryService.getInventoryOperationLog(this.data.id).subscribe((res) => {
      if (res.status === 'success') {

        this.operationLogs = res.data;

      }
    },
      (error) => {
        if (error instanceof HttpErrorResponse) {
          this.toastr.error(error.error.message, 'خطا', { timeOut: 2500 });
        }
      }
    );
  }

  onCloseClick(): void {
    this.dialogRef.close();
  }

}
