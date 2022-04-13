import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CreateArticleCategoryModel } from '@app_models/blog/article-category/create-article-category';
import { ArticleCategoryService } from '@app_services/blog/article-category/article-category.service';
import { CkeditorService } from '@app_services/_common/ckeditor/ckeditor.service';
import { checkFormGroupErrors } from '@app_services/_common/functions/functions';
import { LoadingService } from '@loading-service';

@Component({
  selector: 'app-create-article-category',
  templateUrl: './create-article-category.dialog.html'
})
export class CreateArticleCategoryDialog implements OnInit {

  createForm: FormGroup;
  fileUploaded: boolean = false;
  imageFileToUpload: any;
  ckeditorTextValue = null;

  constructor(
    public dialogRef: MatDialogRef<CreateArticleCategoryDialog>,
    private articleCategoryService: ArticleCategoryService,
    private ckeditorService: CkeditorService,
    private loading: LoadingService
  ) { }

  ngOnInit(): void {

    this.ckeditorService.initCkeditor();

    this.createForm = new FormGroup({
      title: new FormControl(null, [Validators.required, Validators.maxLength(100)]),
      orderShow: new FormControl(null, [Validators.required, Validators.maxLength(100)]),
      imageAlt: new FormControl(null, [Validators.required, Validators.maxLength(200)]),
      imageTitle: new FormControl(null, [Validators.required, Validators.maxLength(200)]),
      metaKeywords: new FormControl(null, [Validators.required, Validators.maxLength(80)]),
      metaDescription: new FormControl(null, [Validators.required, Validators.maxLength(100)]),
      canonicalAddress: new FormControl(null, [Validators.maxLength(500)])
    });
  }

  checkError(controlName: string, errorName: string): boolean {
    return checkFormGroupErrors(this.createForm, controlName, errorName)
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

      const createData = new CreateArticleCategoryModel(
        this.createForm.controls.title.value,
        this.ckeditorService.getValue(),
        this.createForm.controls.orderShow.value,
        this.imageFileToUpload,
        this.createForm.controls.imageAlt.value,
        this.createForm.controls.imageTitle.value,
        this.createForm.controls.metaKeywords.value,
        this.createForm.controls.metaDescription.value,
        this.createForm.controls.canonicalAddress.value
      );

      this.articleCategoryService.createArticleCategory(createData).subscribe((res) => {
        if (res.status === 200) {

          this.createForm.reset();
          this.onCloseClick();

        }
      });

    } else {
      this.createForm.markAllAsTouched();
    }

    this.loading.loadingOff();

  }
}
