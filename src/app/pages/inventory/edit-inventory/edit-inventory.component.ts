import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EditInventoryModel } from '@app_models/inventory/edit-inventory';
import { CkeditorService } from '@app_services/common/ckeditor/ckeditor.service';
import { InventoryService } from '@app_services/inventory/inventory.service';
import { environment } from '@environments/environment';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-inventory',
  templateUrl: './edit-inventory.component.html'
})
export class EditInventoryComponent implements OnInit {

  editForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditInventoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {id: number},
    private inventoryService: InventoryService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {

    this.editForm = new FormGroup({
      productId: new FormControl(null, [Validators.required]),
      unitPrice: new FormControl(null, [Validators.required])
    });

    this.inventoryService.getInventoryDetails(this.data.id).subscribe((res) => {
      
      if (res.status === 'success') {

        this.editForm.controls.productId.setValue(res.data.productId)
        this.editForm.controls.unitPrice.setValue(res.data.unitPrice)

      }
    },
      (error) => {
        if (error instanceof HttpErrorResponse) {
          this.onCloseClick();
          this.toastr.error(error.error.message, 'خطا', { timeOut: 2500 });
        }
      }
    );
  }

  onCloseClick(): void {
    this.dialogRef.close();
  }

  submiteditForm() {
    if (this.editForm.valid) {

      const editData = new EditInventoryModel(
        this.data.id,
        this.editForm.controls.productId.value,
        this.editForm.controls.unitPrice.value
      );

      this.inventoryService.editInventory(editData).subscribe((res) => {
        if (res.status === 'success') {

          this.toastr.success(res.message, 'موفقیت', { timeOut: 1500 });
          this.editForm.reset();
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
      this.editForm.markAllAsTouched();
    }

  }

}
