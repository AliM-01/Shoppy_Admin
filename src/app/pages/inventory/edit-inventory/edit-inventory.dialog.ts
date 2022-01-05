import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EditInventoryModel } from '@app_models/inventory/edit-inventory';
import { LoadingService } from '@app_services/common/loading/loading.service';
import { InventoryService } from '@app_services/inventory/inventory.service';

@Component({
  selector: 'app-edit-inventory',
  templateUrl: './edit-inventory.dialog.html'
})
export class EditInventoryDialog implements OnInit {

  editForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditInventoryDialog>,
    @Inject(MAT_DIALOG_DATA) public data: {id: number},
    private inventoryService: InventoryService,    
    private loading: LoadingService
  ) { }

  ngOnInit(): void {

    this.loading.loadingOn();

    this.editForm = new FormGroup({
      productId: new FormControl(null, [Validators.required]),
      unitPrice: new FormControl(null, [Validators.required])
    });

    this.inventoryService.getInventoryDetails(this.data.id).subscribe((res) => {
      
      if (res.status === 'success') {

        this.editForm.controls.productId.setValue(res.data.productId)
        this.editForm.controls.unitPrice.setValue(res.data.unitPrice)

      }
    });

    this.loading.loadingOff();

  }

  onCloseClick(): void {
    this.dialogRef.close();
  }

  submiteditForm() {
    this.loading.loadingOn()

    if (this.editForm.valid) {

      const editData = new EditInventoryModel(
        this.data.id,
        this.editForm.controls.productId.value,
        this.editForm.controls.unitPrice.value
      );

      this.inventoryService.editInventory(editData).subscribe((res) => {
        if (res.status === 'success') {

          this.editForm.reset();
          this.onCloseClick();

        }
      });


    } else {
      this.editForm.markAllAsTouched();
    }

    this.loading.loadingOff()

  }

}
