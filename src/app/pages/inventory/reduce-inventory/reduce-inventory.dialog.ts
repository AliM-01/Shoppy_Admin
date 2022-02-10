import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReduceInventoryModel } from '@app_models/inventory/reduce-inventory';
import { checkFormGroupErrors } from '@app_services/_common/functions/functions';
import { LoadingService } from '@loading';
import { InventoryService } from '@app_services/inventory/inventory.service';

@Component({
  selector: 'app-Reduce-inventory',
  templateUrl: './Reduce-inventory.dialog.html'
})
export class ReduceInventoryDialog implements OnInit {

  reduceForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ReduceInventoryDialog>,
    @Inject(MAT_DIALOG_DATA) public data: { id: string },
    private inventoryService: InventoryService,
    private loading: LoadingService
  ) { }

  ngOnInit(): void {

    this.reduceForm = new FormGroup({
      productId: new FormControl(null, [Validators.required, Validators.min(1), Validators.max(10000)]),
      count: new FormControl(null, [Validators.required, Validators.min(1), Validators.max(10000)]),
      description: new FormControl(null, [Validators.required, Validators.maxLength(250)])
    });

  }

  checkError(controlName: string, errorName: string): boolean {
    return checkFormGroupErrors(this.reduceForm, controlName, errorName)
  }
  
  onCloseClick(): void {
    this.dialogRef.close();
  }

  submitreduceForm() {
    this.loading.loadingOn()

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
          this.reduceForm.reset();
          this.onCloseClick();
        }
      });

    } else {
      this.reduceForm.markAllAsTouched();
    }

    this.loading.loadingOff();

  }

}
