import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CreateProductFeatureModel } from '@app_models/shop/product-feature/create-product-feature';
import { checkFormGroupErrors } from '@app_services/_common/functions/functions';
import { LoadingService } from '@loading';
import { ProductFeatureService } from '@app_services/shop/product-feature/product-feature.service';

@Component({
  selector: 'app-create-product-feature',
  templateUrl: './create-product-feature.dialog.html'
})
export class CreateProductFeatureDialog implements OnInit {

  createForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<CreateProductFeatureDialog>,
    @Inject(MAT_DIALOG_DATA) public data: { productId: number },
    private productFeatureService: ProductFeatureService,
    private loading: LoadingService
  ) { }

  ngOnInit(): void {

    if(this.data.productId === undefined){
      this.onCloseClick();
    }
    
    this.createForm = new FormGroup({
      featureTitle: new FormControl(null, [Validators.required, Validators.maxLength(100)]),
      featureValue: new FormControl(null, [Validators.required, Validators.maxLength(250)]),
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

      const createData = new CreateProductFeatureModel(
        this.data.productId,
        this.createForm.controls.featureTitle.value,
        this.createForm.controls.featureValue.value
      );

      this.productFeatureService.createProductFeature(createData).subscribe((res) => {
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
