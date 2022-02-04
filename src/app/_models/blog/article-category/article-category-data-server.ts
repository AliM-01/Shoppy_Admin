import { of } from "rxjs";
import { FilterArticleCategoryModel, ArticleCategoryModel} from "./_index";
import { catchError, finalize } from 'rxjs/operators';
import { IResponse } from '@app_models/_common/IResponse';
import { ArticleCategoryService } from "@app_services/blog/article-category/article-category.service";

export class ArticleCategoryDataServer {

    public data: ArticleCategoryModel[] = [];
    public resultsLength = 0;
    public isLoadingResults = true;
    public pageId: number = 1;

    constructor(private articleCategoryService: ArticleCategoryService) {}

    loadArticleCategories(filterArticleCategories: FilterArticleCategoryModel) {

        this.isLoadingResults = true;

        this.articleCategoryService.filterArticleCategory(filterArticleCategories)
        .pipe(catchError(() => of([])),finalize(() => {
            this.isLoadingResults = true;
        }))
        .subscribe((res : IResponse<FilterArticleCategoryModel>) => {
            setTimeout(() => {
                this.data = res.data.articleCategories;
                this.resultsLength = res.data.allPagesCount;
                this.isLoadingResults = false;
                this.pageId = res.data.pageId;
            }, 750)
        });

    } 
}

