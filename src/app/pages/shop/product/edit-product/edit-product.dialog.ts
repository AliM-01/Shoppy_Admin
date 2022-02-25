import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductCategoryForSelectListModel } from '@app_models/shop/product-category/product-category-for-select-list';
import { EditProductModel } from '@app_models/shop/product/edit-product';
import { CkeditorService } from '@app_services/_common/ckeditor/ckeditor.service';
import { checkFormGroupErrors } from '@app_services/_common/functions/functions';
import { LoadingService } from '@loading';
import { ProductCategoryService } from '@app_services/shop/product-category/product-category.service';
import { ProductService } from '@app_services/shop/product/product.service';
import { environment } from '@environments/environment';
import { Observable, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.dialog.html'
})
export class EditProductDialog implements OnInit {

  pageTitleSubject: BehaviorSubject<string> = new BehaviorSubject<string>("محصول");
  pageTitle: Observable<string> = this.pageTitleSubject.asObservable();
  editForm: FormGroup;
  fileUploaded: boolean = false;
  imageFileToUpload: any;
  imagePath: any;
  ckeditorTextValue = null;
  categories: ProductCategoryForSelectListModel[] = [];


  constructor(
    public dialogRef: MatDialogRef<EditProductDialog>,
    private productCategoryService: ProductCategoryService,
    private productService: ProductService,
    @Inject(MAT_DIALOG_DATA) public data: { id: string },
    private ckeditorService: CkeditorService,
    private loading: LoadingService
  ) { }

  ngOnInit(): void {

    this.loading.loadingOn();

    this.ckeditorService.initCkeditor();

    this.getProductCategoriesForSelectList();

    this.editForm = new FormGroup({
      categoryId: new FormControl(null, [Validators.required]),
      title: new FormControl(null, [Validators.required, Validators.maxLength(100)]),
      shortDescription: new FormControl(null, [Validators.required, Validators.maxLength(250)]),
      imageAlt: new FormControl(null, [Validators.required, Validators.maxLength(200)]),
      imageTitle: new FormControl(null, [Validators.required, Validators.maxLength(200)]),
      metaKeywords: new FormControl(null, [Validators.required, Validators.maxLength(80)]),
      metaDescription: new FormControl(null, [Validators.required, Validators.maxLength(100)])
    });

    this.productService.getProductDetails(this.data.id).subscribe((res) => {
      if (res.status === 'success') {

        this.pageTitleSubject.next(res.data.title + "کد : " + res.data.code);

        this.editForm.controls.categoryId.setValue(res.data.categoryId);
        this.editForm.controls.title.setValue(res.data.title);
        this.editForm.controls.shortDescription.setValue(res.data.shortDescription);

        this.ckeditorTextValue = res.data.description;
        this.ckeditorService.setValue(res.data.description);
        this.imagePath = `${environment.productBaseImagePath}/thumbnail/${res.data.imagePath}`;
        this.editForm.controls.imageAlt.setValue(res.data.imageAlt);
        this.editForm.controls.imageTitle.setValue(res.data.imageTitle);
        this.editForm.controls.metaKeywords.setValue(res.data.metaKeywords);
        this.editForm.controls.metaDescription.setValue(res.data.metaDescription);

        console.log(res);
        console.log(this.editForm.controls);
        
      }
    },
      (error) => { this.onCloseClick(); });

    this.loading.loadingOff();

  }

  checkError(controlName: string, errorName: string): boolean {
    return checkFormGroupErrors(this.editForm, controlName, errorName)
  }

  getProductCategoriesForSelectList() {
    this.productCategoryService.getProductCategoriesList().subscribe((res) => {
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

  submiteditForm() {
    this.loading.loadingOn();

    this.ckeditorTextValue = this.ckeditorService.getValue();

    if (this.editForm.valid) {
      if (!this.fileUploaded) {
        this.imageFileToUpload = null;
      }

      const editData = new EditProductModel(
        this.data.id,
        this.editForm.controls.categoryId.value,
        this.editForm.controls.title.value,
        "",
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
          this.onCloseClick();

        }
      });

    } else {
      this.editForm.markAllAsTouched();
    }
    this.loading.loadingOff();

  }

}
