import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EditProductCategoryModel } from '@app_models/shop/product-category/edit-product-category';
import { CkeditorService } from '@app_services/_common/ckeditor/ckeditor.service';
import { checkFormGroupErrors } from '@app_services/_common/functions/functions';
import { LoadingService } from '@loading';
import { ProductCategoryService } from '@app_services/shop/product-category/product-category.service';
import { environment } from '@environments/environment';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-edit-product-category',
  templateUrl: './edit-product-category.dialog.html'
})
export class EditProductCategoryDialog implements OnInit {

  pageTitleSubject: BehaviorSubject<string> = new BehaviorSubject<string>("ویرایش دسته بندی");
  pageTitle: Observable<string> = this.pageTitleSubject.asObservable();

  editForm: FormGroup;
  fileUploaded: boolean = false;
  imageFileToUpload: any;
  imagePath: any;
  ckeditorTextValue = null;

  constructor(
    public dialogRef: MatDialogRef<EditProductCategoryDialog>,
    @Inject(MAT_DIALOG_DATA) public data: {id: number},
    private productCategoryService: ProductCategoryService,
    private ckeditorService: CkeditorService,    
    private loading: LoadingService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {

    this.ckeditorService.initCkeditor();

    this.editForm = new FormGroup({
      title: new FormControl(null, [Validators.required, Validators.maxLength(100)]),
      imageAlt: new FormControl(null, [Validators.required, Validators.maxLength(200)]),
      imageTitle: new FormControl(null, [Validators.required, Validators.maxLength(200)]),
      metaKeywords: new FormControl(null, [Validators.required, Validators.maxLength(80)]),
      metaDescription: new FormControl(null, [Validators.required, Validators.maxLength(100)])
    });

    this.productCategoryService.getProductCategoryDetails(this.data.id).subscribe((res) => {
      
      if (res.status === 'success') {

        this.pageTitleSubject.next(`ویرایش دسته بندی : ${res.data.title}`);

        this.editForm.controls.title.setValue(res.data.title)
        this.ckeditorTextValue = res.data.description;
        this.ckeditorService.setValue(res.data.description);
        this.imagePath = `${environment.productCategoryBaseImagePath}/original/${res.data.imagePath}` ;
        this.editForm.controls.imageAlt.setValue(res.data.imageAlt);
        this.editForm.controls.imageTitle.setValue(res.data.imageTitle);
        this.editForm.controls.metaKeywords.setValue(res.data.metaKeywords);
        this.editForm.controls.metaDescription.setValue(res.data.metaDescription);

      }
    });
  }

  checkError(controlName: string, errorName: string): boolean {
    return checkFormGroupErrors(this.editForm, controlName, errorName)
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

  submiteditForm() {    
    this.loading.loadingOn();

    this.ckeditorTextValue = this.ckeditorService.getValue();
    
    if (this.editForm.valid) {

      if (!this.fileUploaded) {
        this.imageFileToUpload = null;
      }

      const editData = new EditProductCategoryModel(
        this.data.id,
        this.editForm.controls.title.value,
        this.ckeditorService.getValue(),
        this.imagePath,
        this.fileUploaded,
        this.imageFileToUpload,
        this.editForm.controls.imageAlt.value,
        this.editForm.controls.imageTitle.value,
        this.editForm.controls.metaKeywords.value,
        this.editForm.controls.metaDescription.value
      );

      this.productCategoryService.editProductCategory(editData).subscribe((res) => {
        if (res.status === 'success') {

          this.editForm.reset();
          this.onCloseClick();

        }
      });

    } else {
      this.editForm.markAllAsTouched();
    }
    this.loading.loadingOff();

  }

}
