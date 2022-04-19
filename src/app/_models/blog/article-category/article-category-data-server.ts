import { of } from "rxjs";
import { FilterArticleCategoryModel, ArticleCategoryModel } from "./_index";
import { catchError, finalize } from 'rxjs/operators';
import { ArticleCategoryService } from "@app_services/blog/article-category/article-category.service";

export class ArticleCategoryDataServer {

  public data: ArticleCategoryModel[] = [];
  public resultsLength = 0;
  public isLoadingResults = true;
  public pageId: number = 1;

  constructor(private articleCategoryService: ArticleCategoryService) { }

  loadArticleCategories(filterArticleCategories: FilterArticleCategoryModel) {

    this.isLoadingResults = true;

    this.articleCategoryService.filterArticleCategory(filterArticleCategories)
      .pipe(catchError(() => of([])), finalize(() => {
        this.isLoadingResults = true;
      }))
      .subscribe((res: FilterArticleCategoryModel) => {
        setTimeout(() => {
          this.data = res.articleCategories;
          this.resultsLength = res.dataCount;
          this.isLoadingResults = false;
          this.pageId = res.pageId;
        }, 750)
      });

  }
}

