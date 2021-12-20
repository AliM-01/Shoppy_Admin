import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductCategoryForSelectListModel } from '@app_models/shop/product-category/product-category-for-select-list';
import { EditProductModel } from '@app_models/shop/product/edit-product';
import { CkeditorService } from '@app_services/common/ckeditor/ckeditor.service';
import { ProductCategoryService } from '@app_services/shop/product-category/product-category.service';
import { ProductService } from '@app_services/shop/product/product.service';
import { environment } from '@environments/environment';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html'
})
export class EditProductComponent implements OnInit {

  editForm: FormGroup;
  fileUploaded: boolean = false;
  imageFileToUpload: any;
  imagePath: any;
  ckeditorTextValue = null;
  productInStockState: boolean = true;
  inputAvailable: boolean = true;
  inputUnAvailable: boolean;
  categories: ProductCategoryForSelectListModel[] = [];


  constructor(
    public dialogRef: MatDialogRef<EditProductComponent>,
    private productCategoryService: ProductCategoryService,
    private productService: ProductService,
    @Inject(MAT_DIALOG_DATA) public data: { id: number },
    private ckeditorService: CkeditorService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {

    this.ckeditorService.initCkeditor();

    this.getProductCategoriesForSelectList();

    this.editForm = new FormGroup({
      categoryId: new FormControl(null, [Validators.required]),
      title: new FormControl(null, [Validators.required]),
      code: new FormControl(null, [Validators.required]),
      unitPrice: new FormControl(null, [Validators.required]),
      shortDescription: new FormControl(null, [Validators.required]),
      imageAlt: new FormControl(null, [Validators.required]),
      imageTitle: new FormControl(null, [Validators.required]),
      metaKeywords: new FormControl(null, [Validators.required]),
      metaDescription: new FormControl(null, [Validators.required])
    });

    this.productService.getProductDetails(this.data.id).subscribe((res) => {
      console.log(res);

      if (res.status === 'success') {

        this.editForm.controls.categoryId.setValue(res.data.categoryId)
        this.editForm.controls.title.setValue(res.data.title)
        this.editForm.controls.code.setValue(res.data.code)
        this.editForm.controls.unitPrice.setValue(res.data.unitPrice)
        this.editForm.controls.shortDescription.setValue(res.data.shortDescription)

        if (res.data.isInStock) {
          this.inputAvailable = true;
          this.inputUnAvailable = false;
        } else {
          this.inputAvailable = false;
          this.inputUnAvailable = true;
        }

        this.ckeditorTextValue = res.data.description;
        this.ckeditorService.setValue(res.data.description);
        this.imagePath = `${environment.productBaseImagePath}/original/${res.data.imagePath}`;
        this.editForm.controls.imageAlt.setValue(res.data.imageAlt);
        this.editForm.controls.imageTitle.setValue(res.data.imageTitle);
        this.editForm.controls.metaKeywords.setValue(res.data.metaKeywords);
        this.editForm.controls.metaDescription.setValue(res.data.metaDescription);

      }
    },
      (error) => {
        if (error instanceof HttpErrorResponse) {

          this.toastr.error(error.error.message, 'خطا', { timeOut: 2500 });
          this.onCloseClick();

        }
      }
    );
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

          this.toastr.error(error.error.message, 'خطا', { timeOut: 2500 });

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

  submiteditForm() {
    console.log(this.editForm.controls.categoryId.value);

    this.ckeditorTextValue = this.ckeditorService.getValue();

    if (this.editForm.valid) {
      if (!this.fileUploaded) {
        this.imageFileToUpload = null;
      }

      const editData = new EditProductModel(
        this.data.id,
        this.editForm.controls.categoryId.value,
        this.editForm.controls.title.value,
        this.editForm.controls.code.value,
        this.editForm.controls.unitPrice.value,
        this.productInStockState,
        this.editForm.controls.shortDescription.value,
        this.ckeditorTextValue,
        this.imagePath,
        this.imageFileToUpload,
        this.fileUploaded,
        this.editForm.controls.imageAlt.value,
        this.editForm.controls.imageTitle.value,
        this.editForm.controls.metaKeywords.value,
        this.editForm.controls.metaDescription.value
      );

      this.productService.editProduct(editData).subscribe((res) => {
        if (res.status === 'success') {

          this.editForm.reset();

          this.toastr.toastrConfig.tapToDismiss = false;
          this.toastr.toastrConfig.autoDismiss = true;
          this.toastr.toastrConfig.timeOut = 1500;

          let toasterMsg = `محصول ${editData.code} با موفقیت ویرایش شد`
          this.toastr.success(toasterMsg, 'موفقیت', { timeOut: 1500 });
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
      this.editForm.markAllAsTouched();
    }

  }

}
