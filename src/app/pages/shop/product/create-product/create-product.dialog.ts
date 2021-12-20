import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
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
  productInStockState: boolean = true;
  inputAvailable: boolean = true;
  inputUnAvailable: boolean;
  categories: ProductCategoryForSelectListModel[] = [];

  constructor(
    public dialogRef: MatDialogRef<CreateProductDialog>,
    private productService: ProductService,
    private productCategoryService: ProductCategoryService,
    private ckeditorService: CkeditorService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {

    this.ckeditorService.initCkeditor();

    this.getProductCategoriesForSelectList();

    this.createForm = new FormGroup({
      categoryId: new FormControl(null, [Validators.required]),
      title: new FormControl(null, [Validators.required]),
      unitPrice: new FormControl(null, [Validators.required]),
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

  changeProductInStockState(state: boolean): void {
    this.productInStockState = state;
    if (state === true) {
      this.inputAvailable = true;
      this.inputUnAvailable = false;
    } else {
      this.inputAvailable = false;
      this.inputUnAvailable = true;
    }
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
        this.createForm.controls.unitPrice.value,
        this.productInStockState,
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
