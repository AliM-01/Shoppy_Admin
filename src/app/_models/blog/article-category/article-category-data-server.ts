import {FilterArticleCategoryModel, ArticleCategoryModel} from "./_index";
import {finalize} from 'rxjs/operators';
import {ArticleCategoryService} from "@app_services/blog/article-category/article-category.service";
import {BaseDataServer} from "@app_models/_common/_index";

export class ArticleCategoryDataServer extends BaseDataServer<ArticleCategoryModel, FilterArticleCategoryModel> {

  constructor(private articleCategoryService: ArticleCategoryService) {
    super();
  }

  load(filter: FilterArticleCategoryModel): void {
    this.loadingOn();

    this.articleCategoryService.filterArticleCategory(filter)
      .pipe(
        finalize(() => {
          this.loadingOff();
        })
      )
      .subscribe((res: FilterArticleCategoryModel) => {
        this.data = res.articleCategories === undefined ? [] : res.articleCategories;
        this.resultsLength = res.dataCount;
        this.pageId = res.pageId;
      });
  }
}

