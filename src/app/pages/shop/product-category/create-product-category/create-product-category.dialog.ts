import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CreateProductCategoryModel } from '@app_models/shop/product-category/create-product-category';
import { CkeditorService } from '@app_services/common/ckeditor/ckeditor.service';
import { ProductCategoryService } from '@app_services/shop/product-category/product-category.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-product-category',
  templateUrl: './create-product-category.dialog.html'
})
export class CreateProductCategoryDialog implements OnInit {

  createForm: FormGroup;
  fileUploaded: boolean = false;
  imageFileToUpload: any;
  ckeditorTextValue = null;

  constructor(
    public dialogRef: MatDialogRef<CreateProductCategoryDialog>,
    private productCategoryService: ProductCategoryService,
    private ckeditorService: CkeditorService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {

    this.ckeditorService.initCkeditor();

    this.createForm = new FormGroup({
      title: new FormControl(null, [Validators.required]),
      imageAlt: new FormControl(null, [Validators.required]),
      imageTitle: new FormControl(null, [Validators.required]),
      metaKeywords: new FormControl(null, [Validators.required]),
      metaDescription: new FormControl(null, [Validators.required])
    });
  }

  getImageFileToUpload(event: any) {
    this.imageFileToUpload = event.target.files[0];
    this.fileUploaded = true;
  }

  onCloseClick(): void {
    this.dialogRef.close();
  }

  submitCreateForm() {
    this.ckeditorTextValue = this.ckeditorService.getValue();

    if (this.createForm.valid) {

      if (this.imageFileToUpload === undefined || this.imageFileToUpload === null) {
        this.fileUploaded = false;
      } else {
        this.fileUploaded = true;
      }

      const createData = new CreateProductCategoryModel(
        this.createForm.controls.title.value,
        this.ckeditorService.getValue(),
        this.imageFileToUpload,
        this.createForm.controls.imageAlt.value,
        this.createForm.controls.imageTitle.value,
        this.createForm.controls.metaKeywords.value,
        this.createForm.controls.metaDescription.value
      );

      this.productCategoryService.createProductCategory(createData).subscribe((res) => {
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
