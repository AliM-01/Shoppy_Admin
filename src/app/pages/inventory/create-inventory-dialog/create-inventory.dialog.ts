import { HttpErrorResponse } from '@angular/common/http';
import { CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CreateInventoryModel } from '@app_models/inventory/create-inventory';
import { InventoryService } from '@app_services/inventory/inventory.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-product-category',
  templateUrl: './create-inventory.dialog.html'
})
export class CreateInventoryDialog implements OnInit {

  createForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<CreateInventoryDialog>,
    private inventoryService: InventoryService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {

    this.createForm = new FormGroup({
      productId: new FormControl(null, [Validators.required]),
      unitPrice: new FormControl(null, [Validators.required])
    });
  }
  
  onCloseClick(): void {
    this.dialogRef.close();
  }

  submitCreateForm() {

    if (this.createForm.valid) {

      const createData = new CreateInventoryModel(
        this.createForm.controls.productId.value,
        this.createForm.controls.unitPrice.value
      );

      this.inventoryService.createInventory(createData).subscribe((res) => {
        if (res.status === 'success') {

          this.createForm.reset();

          this.toastr.success(res.message, 'موفقیت', { timeOut: 1500 });
          this.onCloseClick();

        }
      },
        (error) => {
          if (error instanceof HttpErrorResponse) {
            this.toastr.error(error.error.message, 'خطا', { timeOut: 2500 });
          }
        }
      );


    } else {
      this.createForm.markAllAsTouched();
    }

  }
}
