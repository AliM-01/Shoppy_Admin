import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ProductCategoryForSelectListModel } from '@app_models/shop/product-category/product-category-for-select-list';
import { CreateProductModel } from '@app_models/shop/product/create-product';
import { CkeditorService } from '@app_services/common/ckeditor/ckeditor.service';
import { ProductCategoryService } from '@app_services/shop/product-category/product-category.service';
import { ProductService } from '@app_services/shop/product/product.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.dialog.html'
})
export class CreateProductDialog implements OnInit {

  createForm: FormGroup;
  fileUploaded: boolean = false;
  imageFileToUpload: any;
  ckeditorTextValue = null;
  categories: ProductCategoryForSelectListModel[] = [];

  constructor(
    public dialogRef: MatDialogRef<CreateProductDialog>,
    private productService: ProductService,
    private productCategoryService: ProductCategoryService,
    private route: Router,
    private ckeditorService: CkeditorService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {

    this.ckeditorService.initCkeditor();

    this.getProductCategoriesForSelectList();

    this.createForm = new FormGroup({
      categoryId: new FormControl(null, [Validators.required]),
      title: new FormControl(null, [Validators.required]),
      shortDescription: new FormControl(null, [Validators.required]),
      imageAlt: new FormControl(null, [Validators.required]),
      imageTitle: new FormControl(null, [Validators.required]),
      metaKeywords: new FormControl(null, [Validators.required]),
      metaDescription: new FormControl(null, [Validators.required])
    });
  }

  getProductCategoriesForSelectList() {

    this.productCategoryService.getProductCategoriesList().subscribe((res) => {
      if (res.status === 'success') {

        this.categories = res.data;

      }
    },
      (error) => {
        if (error instanceof HttpErrorResponse) {

          this.onCloseClick();

          this.toastr.toastrConfig.tapToDismiss = false;
          this.toastr.toastrConfig.autoDismiss = true;
          this.toastr.toastrConfig.timeOut = 2500;

          this.toastr.error(error.error.message, 'خطا');
        }
      }
    );


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

      const createData = new CreateProductModel(
        this.createForm.controls.categoryId.value,
        this.createForm.controls.title.value,
        this.createForm.controls.shortDescription.value,
        this.ckeditorTextValue,
        this.imageFileToUpload,
        this.createForm.controls.imageAlt.value,
        this.createForm.controls.imageTitle.value,
        this.createForm.controls.metaKeywords.value,
        this.createForm.controls.metaDescription.value
      );

      this.productService.createProduct(createData).subscribe((res) => {
        if (res.status === 'success') {

          this.createForm.reset();

          this.toastr.success(res.message, 'موفقیت', { timeOut: 1500 });

          const pleaseCreateInventoryMsg = `لطفا نسبت به ایجاد انبار این محصول اقدام کنید`

          this.toastr.info(pleaseCreateInventoryMsg, 'مهم', { timeOut: 4000 });

          this.onCloseClick();

          this.route.navigate([`/inventory/create/${res.data.productId}`])
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
