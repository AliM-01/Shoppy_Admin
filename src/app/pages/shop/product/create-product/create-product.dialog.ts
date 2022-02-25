import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ProductCategoryForSelectListModel } from '@app_models/shop/product-category/product-category-for-select-list';
import { CreateProductModel } from '@app_models/shop/product/create-product';
import { CkeditorService } from '@app_services/_common/ckeditor/ckeditor.service';
import { checkFormGroupErrors } from '@app_services/_common/functions/functions';
import { LoadingService } from '@loading';
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
    private loading: LoadingService,
    private ckeditorService: CkeditorService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {

    this.ckeditorService.initCkeditor();

    this.getProductCategoriesForSelectList();

    this.createForm = new FormGroup({
      categoryId: new FormControl(null, [Validators.required]),
      title: new FormControl(null, [Validators.required, Validators.maxLength(100)]),
      shortDescription: new FormControl(null, [Validators.required, Validators.maxLength(250)]),
      imageAlt: new FormControl(null, [Validators.required, Validators.maxLength(200)]),
      imageTitle: new FormControl(null, [Validators.required, Validators.maxLength(200)]),
      metaKeywords: new FormControl(null, [Validators.required, Validators.maxLength(80)]),
      metaDescription: new FormControl(null, [Validators.required, Validators.maxLength(100)])
    });
  }

  checkError(controlName: string, errorName: string): boolean {
    return checkFormGroupErrors(this.createForm, controlName, errorName)
  }

  getProductCategoriesForSelectList() {

    this.productCategoryService.getProductCategoriesList().subscribe(res => {
      if (res.status === 'success') {
        this.categories = res.data;
      }
    });

  }

  getImageFileToUpload(event: any) {
    this.loading.loadingOn();

    this.imageFileToUpload = event.target.files[0];
    this.fileUploaded = true;

    this.loading.loadingOff();
  }

  onCloseClick(): void {
    this.dialogRef.close();
  }

  submitCreateForm() {
    this.loading.loadingOn();

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

          const pleaseCreateInventoryMsg = `لطفا نسبت به ایجاد انبار این محصول اقدام کنید`

          this.toastr.info(pleaseCreateInventoryMsg, 'مهم', { timeOut: 4000 });

          this.onCloseClick();

          this.route.navigate([`/inventory/create/${res.data.productId}`])
        }
      });


    } else {
      this.createForm.markAllAsTouched();
    }
    this.loading.loadingOff();

  }
}
