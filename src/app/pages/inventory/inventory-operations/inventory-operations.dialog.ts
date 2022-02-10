import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { InventoryOperationModel } from '@app_models/inventory/inventory-operation';
import { LoadingService } from '@loading';
import { InventoryService } from '@app_services/inventory/inventory.service';

@Component({
  selector: 'app-create-product-category',
  templateUrl: './inventory-operations.dialog.html'
})
export class InventoryOperationDialog implements OnInit {

  operationLogs: InventoryOperationModel[] = [];

  constructor(
    public dialogRef: MatDialogRef<InventoryOperationDialog>,
    @Inject(MAT_DIALOG_DATA) public data: {id: string},
    private inventoryService: InventoryService,
    private loading: LoadingService
  ) { }

  ngOnInit(): void {
    this.loading.loadingOn();

    this.inventoryService.getInventoryOperationLog(this.data.id).subscribe((res) => {
      if (res.status === 'success') {
        this.operationLogs = res.data;
      }
    });

    this.loading.loadingOff();

  }

  onCloseClick(): void {
    this.dialogRef.close();
  }

}
