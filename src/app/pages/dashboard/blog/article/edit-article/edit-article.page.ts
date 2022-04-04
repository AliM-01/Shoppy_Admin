import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleCategoryForSelectListModel } from '@app_models/blog/article-category/article-category-for-select-list';
import { EditArticleModel } from '@app_models/blog/article/edit-article';
import { ArticleCategoryService } from '@app_services/blog/article-category/article-category.service';
import { ArticleService } from '@app_services/blog/article/article.service';
import { CkeditorService } from '@app_services/_common/ckeditor/ckeditor.service';
import { checkFormGroupErrors } from '@app_services/_common/functions/functions';
import { LoadingService } from '@loading-service';
import { Title } from '@angular/platform-browser';
import { environment } from '@environments/environment';

@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.page.html'
})
export class EditArticlePage implements OnInit {

  articleId:string = "";
  editForm: FormGroup;
  imagePath: any;
  fileUploaded: boolean = false;
  imageFileToUpload: any;
  ckeditorTextValue = null;
  categories: ArticleCategoryForSelectListModel[] = [];

  constructor(
    private articleService: ArticleService,
    private articleCategoryService: ArticleCategoryService,
    private activatedRoute: ActivatedRoute,
    private route: Router,
    private pageTitle: Title,
    private _location: Location,
    private loading: LoadingService,
    private ckeditorService: CkeditorService
  ) {
    this.pageTitle.setTitle('ایجاد مقاله');
   }

  ngOnInit(): void {

    this.loading.loadingOn();

    this.activatedRoute.params.subscribe(params => {
      this.articleId = params.id;

      if (this.articleId === undefined) {
        this.route.navigate(['/article']);
      }

    });

    this.ckeditorService.initCkeditor();

    this.getArticleCategoriesForSelectList();

    this.editForm = new FormGroup({
      categoryId: new FormControl(null, [Validators.required, Validators.min(1), Validators.max(10000)]),
      title: new FormControl(null, [Validators.required, Validators.maxLength(100)]),
      summary: new FormControl(null, [Validators.required, Validators.maxLength(100)]),
      imageAlt: new FormControl(null, [Validators.required, Validators.maxLength(200)]),
      imageTitle: new FormControl(null, [Validators.required, Validators.maxLength(200)]),
      metaKeywords: new FormControl(null, [Validators.required, Validators.maxLength(80)]),
      metaDescription: new FormControl(null, [Validators.required, Validators.maxLength(100)]),
      canonicalAddress: new FormControl(null, [Validators.maxLength(500)])
    });

    this.articleService.getArticleDetails(this.articleId).subscribe((res) => {
      if (res.status === 'success') {

        this.editForm.controls.categoryId.setValue(res.data.categoryId)
        this.editForm.controls.title.setValue(res.data.title)
        this.editForm.controls.summary.setValue(res.data.summary)

        this.ckeditorTextValue = res.data.text;
        this.ckeditorService.setValue(res.data.text);
        this.imagePath = `${environment.articleBaseImagePath}/original/${res.data.imagePath}`;
        this.editForm.controls.imageAlt.setValue(res.data.imageAlt);
        this.editForm.controls.imageTitle.setValue(res.data.imageTitle);
        this.editForm.controls.metaKeywords.setValue(res.data.metaKeywords);
        this.editForm.controls.metaDescription.setValue(res.data.metaDescription);
        this.editForm.controls.canonicalAddress.setValue(res.data.canonicalAddress);

      }
    },
      () => { this.onCloseClick(); });
    this.loading.loadingOff();

  }

  checkError(controlName: string, errorName: string): boolean {
    return checkFormGroupErrors(this.editForm, controlName, errorName)
  }

  onCloseClick(): void {
    this._location.back();
  }

  getArticleCategoriesForSelectList() {

    this.articleCategoryService.getArticleCategoriesSelectList().subscribe(res => {
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

  submiteditForm() {
    this.loading.loadingOn();

    this.ckeditorTextValue = this.ckeditorService.getValue();

    if (this.editForm.valid) {
      if (this.imageFileToUpload === undefined || this.imageFileToUpload === null) {
        this.fileUploaded = false;
      } else {
        this.fileUploaded = true;
      }

      const editData = new EditArticleModel(
        this.articleId,
        this.editForm.controls.title.value,
        this.editForm.controls.summary.value,
        this.ckeditorTextValue,
        this.editForm.controls.categoryId.value,
        this.imagePath,
        this.fileUploaded,
        this.imageFileToUpload,
        this.editForm.controls.imageAlt.value,
        this.editForm.controls.imageTitle.value,
        this.editForm.controls.metaKeywords.value,
        this.editForm.controls.metaDescription.value,
        this.editForm.controls.canonicalAddress.value
      );

      this.articleService.editArticle(editData).subscribe((res) => {
        if (res.status === 'success') {
          this.editForm.reset();
          this.route.navigate(['/article']);
        }
      });


    } else {
      this.editForm.markAllAsTouched();
    }
    this.loading.loadingOff();

  }
}
