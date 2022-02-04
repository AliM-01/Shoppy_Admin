import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CreateInventoryModel } from '@app_models/inventory/create-inventory';
import { InventoryService } from '@app_services/inventory/inventory.service';
import { LoadingService } from '@loading';
import { checkFormGroupErrors } from '@app_services/_common/functions/functions';

@Component({
  selector: 'app-create-product-category',
  templateUrl: './create-inventory.dialog.html'
})
export class CreateInventoryDialog implements OnInit {

  createForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<CreateInventoryDialog>,
    private inventoryService: InventoryService,
    private loading: LoadingService
  ) { }

  ngOnInit(): void {

    this.createForm = new FormGroup({
      productId: new FormControl(null, [Validators.required, Validators.min(1), Validators.max(100000)]),
      unitPrice: new FormControl(null, [Validators.required])
    });

  }
  
  checkError(controlName: string, errorName: string): boolean {
    return checkFormGroupErrors(this.createForm, controlName, errorName)
  }

  onCloseClick(): void {
    this.dialogRef.close();
  }

  submitCreateForm() {

    this.loading.loadingOn();

    if (this.createForm.valid) {

      const createData = new CreateInventoryModel(
        this.createForm.controls.productId.value,
        this.createForm.controls.unitPrice.value
      );

      this.inventoryService.createInventory(createData).subscribe(res => {
        if (res.status === 'success') {
          this.createForm.reset();
          this.onCloseClick();
        }
      });

    } else {
      this.createForm.markAllAsTouched();
    }

    this.loading.loadingOff();

  }
}
