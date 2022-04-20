import {Component, Inject, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {EditProductFeatureModel} from '@app_models/shop/product-feature/edit-product-feature';
import {checkFormGroupErrors} from '@app_services/_common/functions/functions';
import {LoadingService} from '@loading-service';
import {ProductFeatureService} from '@app_services/shop/product-feature/product-feature.service';
import {BehaviorSubject, Observable} from 'rxjs';

@Component({
  selector: 'app-edit-product-feature',
  templateUrl: './edit-product-feature.dialog.html'
})
export class EditProductFeatureDialog implements OnInit {

  pageTitleSubject: BehaviorSubject<string> = new BehaviorSubject<string>("ویرایش ویژگی محصول");
  pageTitle: Observable<string> = this.pageTitleSubject.asObservable();

  editForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditProductFeatureDialog>,
    @Inject(MAT_DIALOG_DATA) public data: {productId: string, id: string},
    private productFeatureService: ProductFeatureService,
    private loading: LoadingService
  ) { }

  ngOnInit(): void {

    this.editForm = new FormGroup({
      featureTitle: new FormControl(null, [Validators.required, Validators.maxLength(100)]),
      featureValue: new FormControl(null, [Validators.required, Validators.maxLength(250)])
    });

    this.productFeatureService.getProductFeatureDetails(this.data.id).subscribe((res) => {
      this.editForm.controls.featureTitle.setValue(res.featureTitle)
      this.editForm.controls.featureValue.setValue(res.featureValue)
    });
  }

  checkError(controlName: string, errorName: string): boolean {
    return checkFormGroupErrors(this.editForm, controlName, errorName)
  }

  onCloseClick(): void {
    this.dialogRef.close();
  }

  submit(): void {
    this.loading.loadingOn();

    if (this.editForm.valid) {

      const editData = new EditProductFeatureModel(
        this.data.id,
        this.data.productId,
        this.editForm.controls.featureTitle.value,
        this.editForm.controls.featureValue.value
      );

      this.productFeatureService.editProductFeature(editData).subscribe(() => {
        this.editForm.reset();
        this.onCloseClick();
      });

    } else {
      this.editForm.markAllAsTouched();
    }
    this.loading.loadingOff();

  }

}
