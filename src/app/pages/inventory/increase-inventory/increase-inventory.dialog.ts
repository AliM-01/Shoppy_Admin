import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IncreaseInventoryModel } from '@app_models/inventory/increase-inventory';
import { InventoryService } from '@app_services/inventory/inventory.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-Increase-inventory',
  templateUrl: './increase-inventory.dialog.html'
})
export class IncreaseInventoryDialog implements OnInit {

  increaseForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<IncreaseInventoryDialog>,
    @Inject(MAT_DIALOG_DATA) public data: {id: number},
    private inventoryService: InventoryService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {

    this.increaseForm = new FormGroup({
      count: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required])
    });

  }

  onCloseClick(): void {
    this.dialogRef.close();
  }

  submitIncreaseForm() {
    if (this.increaseForm.valid) {

      const increaseData = new IncreaseInventoryModel(
        this.data.id,
        this.increaseForm.controls.count.value,
        this.increaseForm.controls.description.value
      );

      this.inventoryService.increaseInventory(increaseData).subscribe((res) => {
        if (res.status === 'success') {

          this.toastr.success(res.message, 'موفقیت', { timeOut: 1500 });
          this.increaseForm.reset();
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
      this.increaseForm.markAllAsTouched();
    }

  }

}
