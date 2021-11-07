import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CreateProductCategoryModel } from '@app_models/product-category/create-product-category';
import { ProductCategoryService } from '@app_services/product-category/product-category.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-product-category',
  templateUrl: './create-product-category.component.html'
})
export class CreateProductCategoryComponent implements OnInit {

  createForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<CreateProductCategoryComponent>,
    private productCategoryService: ProductCategoryService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.createForm = new FormGroup({
      title: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
      imageAlt: new FormControl(null, [Validators.required]),
      imageTitle: new FormControl(null, [Validators.required]),
      metaKeywords: new FormControl(null, [Validators.required]),
      metaDescription: new FormControl(null, [Validators.required])
    });
  }

  onCloseClick(): void {
    this.dialogRef.close();
  }

  submitCreateForm() {
    if (this.createForm.valid) {
      const createData = new CreateProductCategoryModel(
        this.createForm.controls.title.value,
        this.createForm.controls.description.value,
        '...',
        this.createForm.controls.imageAlt.value,
        this.createForm.controls.imageTitle.value,
        this.createForm.controls.metaKeywords.value,
        this.createForm.controls.metaDescription.value
      );

      this.productCategoryService.createProductCategory(createData).subscribe((res) => {
        if (res.status === 'success') {

          this.createForm.reset();

          this.toastr.toastrConfig.tapToDismiss = false;
          this.toastr.toastrConfig.autoDismiss = true;
          this.toastr.toastrConfig.timeOut = 1500;

          this.toastr.success('دسته بندی مورد نظر با موفقیت ایجاد شد', 'موفقیت');

          this.onCloseClick();

        }
      },
        (error) => {
          if (error instanceof HttpErrorResponse) {
            this.toastr.toastrConfig.tapToDismiss = false;
            this.toastr.toastrConfig.autoDismiss = true;
            this.toastr.toastrConfig.timeOut = 2500;

            this.toastr.error(error.error.message, 'خطا');
          }
        }
      );


    } else {
      this.createForm.markAllAsTouched();
    }

  }
}
