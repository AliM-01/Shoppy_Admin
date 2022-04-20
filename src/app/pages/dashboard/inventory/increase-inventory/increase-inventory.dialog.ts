import {Component, Inject, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {IncreaseInventoryModel} from '@app_models/inventory/increase-inventory';
import {checkFormGroupErrors} from '@app_services/_common/functions/functions';
import {LoadingService} from '@loading-service';
import {InventoryService} from '@app_services/inventory/inventory.service';

@Component({
  selector: 'app-increase-inventory',
  templateUrl: './increase-inventory.dialog.html'
})
export class IncreaseInventoryDialog implements OnInit {

  increaseForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<IncreaseInventoryDialog>,
    @Inject(MAT_DIALOG_DATA) public data: {id: string},
    private inventoryService: InventoryService,
    private loading: LoadingService
  ) { }

  ngOnInit(): void {

    this.increaseForm = new FormGroup({
      count: new FormControl(null, [Validators.required, Validators.min(1), Validators.max(10000)]),
      description: new FormControl(null, [Validators.required, Validators.maxLength(250)])
    });

  }

  checkError(controlName: string, errorName: string): boolean {
    return checkFormGroupErrors(this.increaseForm, controlName, errorName)
  }

  onCloseClick(): void {
    this.dialogRef.close();
  }

  submitIncreaseForm(): void {

    this.loading.loadingOn();

    if (this.increaseForm.valid) {

      const increaseData = new IncreaseInventoryModel(
        this.data.id,
        this.increaseForm.controls.count.value,
        this.increaseForm.controls.description.value
      );

      this.inventoryService.increaseInventory(increaseData).subscribe((res) => {
        if (res.status === 200) {
          this.increaseForm.reset();
          this.onCloseClick();
        }
      });

    } else {
      this.increaseForm.markAllAsTouched();
    }

    this.loading.loadingOff();

  }

}
