/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Location} from '@angular/common';
import {Router} from '@angular/router';
import {ArticleCategoryForSelectListModel} from '@app_models/blog/article-category/article-category-for-select-list';
import {CreateArticleModel} from '@app_models/blog/article/create-article';
import {ArticleCategoryService} from '@app_services/blog/article-category/article-category.service';
import {ArticleService} from '@app_services/blog/article/article.service';
import {CkeditorService} from '@app_services/_common/ckeditor/ckeditor.service';
import {checkFormGroupErrors} from '@app_services/_common/functions/functions';
import {LoadingService} from '@loading-service';

@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.page.html'
})
export class CreateArticlePage implements OnInit {

  createForm: FormGroup;
  fileUploaded = false;
  imageFileToUpload: any;
  ckeditorTextValue = null;
  categories: ArticleCategoryForSelectListModel[] = [];

  constructor(
    private articleService: ArticleService,
    private articleCategoryService: ArticleCategoryService,
    private route: Router,
    private _location: Location,
    private loading: LoadingService,
    private ckeditorService: CkeditorService
  ) { }

  ngOnInit(): void {

    this.ckeditorService.initCkeditor();

    this.getArticleCategoriesForSelectList();

    this.createForm = new FormGroup({
      categoryId: new FormControl(null, [Validators.required, Validators.min(1), Validators.max(10000)]),
      title: new FormControl(null, [Validators.required, Validators.maxLength(100)]),
      summary: new FormControl(null, [Validators.required, Validators.maxLength(100)]),
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

  onCloseClick(): void {
    this._location.back();
  }

  getArticleCategoriesForSelectList(): void {

    this.articleCategoryService.getArticleCategoriesSelectList().subscribe(res => this.categories = res);

  }

  getImageFileToUpload(event: any): void {
    this.loading.loadingOn();

    this.imageFileToUpload = event.target.files[0];
    this.fileUploaded = true;

    this.loading.loadingOff();
  }

  submitCreateForm(): void {
    this.loading.loadingOn();

    this.ckeditorTextValue = this.ckeditorService.getValue();

    if (this.createForm.valid) {
      if (this.imageFileToUpload === undefined || this.imageFileToUpload === null) {
        this.fileUploaded = false;
      } else {
        this.fileUploaded = true;
      }

      const createData = new CreateArticleModel(
        this.createForm.controls.title.value,
        this.createForm.controls.summary.value,
        this.ckeditorTextValue,
        this.createForm.controls.categoryId.value,
        this.imageFileToUpload,
        this.createForm.controls.imageAlt.value,
        this.createForm.controls.imageTitle.value,
        this.createForm.controls.metaKeywords.value,
        this.createForm.controls.metaDescription.value,
        this.createForm.controls.canonicalAddress.value
      );

      this.articleService.createArticle(createData).subscribe((res) => {
        if (res.status === 200) {
          this.createForm.reset();
          this.route.navigate(['/article']);
        }
      });


    } else {
      this.createForm.markAllAsTouched();
    }
    this.loading.loadingOff();

  }
}
