import { of } from "rxjs";
import { FilterArticleModel, ArticleModel} from "./_index";
import { catchError, finalize } from 'rxjs/operators';
import { IResponse } from '@app_models/_common/IResponse';
import { ArticleService } from "@app_services/blog/article/article.service";

export class ArticleDataServer {

    public data: ArticleModel[] = [];
    public resultsLength = 0;
    public isLoadingResults = true;
    public pageId: number = 1;

    constructor(private articleService: ArticleService) {}

    loadArticles(filterArticleCategories: FilterArticleModel) {

        this.isLoadingResults = true;

        this.articleService.filterArticle(filterArticleCategories)
        .pipe(catchError(() => of([])),finalize(() => {
            this.isLoadingResults = true;
        }))
        .subscribe((res : IResponse<FilterArticleModel>) => {
            setTimeout(() => {
                this.data = res.data.articles;
                this.resultsLength = res.data.allPagesCount;
                this.isLoadingResults = false;
                this.pageId = res.data.pageId;
            }, 750)
        });

    } 
}

