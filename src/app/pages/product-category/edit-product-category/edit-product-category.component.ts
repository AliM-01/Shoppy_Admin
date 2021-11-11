import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CreateProductCategoryModel } from '@app_models/product-category/create-product-category';
import { CkeditorService } from '@app_services/common/ckeditor/ckeditor.service';
import { ProductCategoryService } from '@app_services/product-category/product-category.service';
import { ToastrService } from 'ngx-toastr';
import { CreateProductCategoryComponent } from '../create-product-category/create-product-category.component';

@Component({
  selector: 'app-edit-product-category',
  templateUrl: './edit-product-category.component.html'
})
export class EditProductCategoryComponent implements OnInit {

  
  editForm: FormGroup;
  fileUploaded: boolean = false;
  imageFileToUpload: any;
  ckeditor;
  ckeditorTextValue = null;

  constructor(
    public dialogRef: MatDialogRef<EditProductCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {id: number},
    private productCategoryService: ProductCategoryService,
    private ckeditorService: CkeditorService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {

    console.log(this.data.id);
    
    this.ckeditorService.initCkeditor(this.ckeditor);

    this.editForm = new FormGroup({
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

  submiteditForm() {
    this.ckeditorTextValue = this.ckeditorService.getValue();
    
    if (this.editForm.valid) {

      if (this.imageFileToUpload === undefined || this.imageFileToUpload === null) {
        this.fileUploaded = false;
      } else {
        this.fileUploaded = true;
      }

      const createData = new CreateProductCategoryModel(
        this.editForm.controls.title.value,
        this.ckeditorService.getValue(),
        this.imageFileToUpload,
        this.editForm.controls.imageAlt.value,
        this.editForm.controls.imageTitle.value,
        this.editForm.controls.metaKeywords.value,
        this.editForm.controls.metaDescription.value
      );

      this.productCategoryService.createProductCategory(createData).subscribe((res) => {
        if (res.status === 'success') {

          this.editForm.reset();

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
      this.editForm.markAllAsTouched();
    }

  }

}
