import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReduceInventoryModel } from '@app_models/inventory/reduce-inventory';
import { InventoryService } from '@app_services/inventory/inventory.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-Reduce-inventory',
  templateUrl: './Reduce-inventory.dialog.html'
})
export class ReduceInventoryDialog implements OnInit {

  reduceForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ReduceInventoryDialog>,
    @Inject(MAT_DIALOG_DATA) public data: {id: number},
    private inventoryService: InventoryService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {

    this.reduceForm = new FormGroup({
      productId: new FormControl(null, [Validators.required]),
      count: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required])
    });

  }

  onCloseClick(): void {
    this.dialogRef.close();
  }

  submitreduceForm() {
    if (this.reduceForm.valid) {

      const reduceData = new ReduceInventoryModel(
        this.data.id,
        0,
        this.reduceForm.controls.productId.value,
        this.reduceForm.controls.count.value,
        this.reduceForm.controls.description.value
      );

      this.inventoryService.reduceInventory(reduceData).subscribe((res) => {
        if (res.status === 'success') {

          this.toastr.success(res.message, 'موفقیت', { timeOut: 1500 });
          this.reduceForm.reset();
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
      this.reduceForm.markAllAsTouched();
    }

  }

}
