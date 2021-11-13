import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CreateProductModel } from '@app_models/product/create-product';
import { CkeditorService } from '@app_services/common/ckeditor/ckeditor.service';
import { ProductService } from '@app_services/product/product.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html'
})
export class CreateProductComponent implements OnInit {

  createForm: FormGroup;
  fileUploaded: boolean = false;
  imageFileToUpload: any;
  ckeditorTextValue = null;
  productInStockState: boolean = true;
  inputAvailable: boolean = true;
  inputUnAvailable: boolean;


  constructor(
    public dialogRef: MatDialogRef<CreateProductComponent>,
    private productService: ProductService,
    private ckeditorService: CkeditorService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {

    this.ckeditorService.initCkeditor();

    this.createForm = new FormGroup({
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
    if(state === true){
      this.inputAvailable = true;
      this.inputUnAvailable = false;
    } else{
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
        this.createForm.controls.code.value,
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

          this.toastr.toastrConfig.tapToDismiss = false;
          this.toastr.toastrConfig.autoDismiss = true;
          this.toastr.toastrConfig.timeOut = 1500;

          this.toastr.success('محصول مورد نظر با موفقیت ایجاد شد', 'موفقیت');

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
