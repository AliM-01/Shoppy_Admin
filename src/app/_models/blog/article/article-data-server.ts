import {of} from "rxjs";
import {FilterArticleModel, ArticleModel} from "./_index";
import {catchError, finalize} from 'rxjs/operators';
import {ArticleService} from "@app_services/blog/article/article.service";

export class ArticleDataServer {

  public data: ArticleModel[] = [];
  public resultsLength = 0;
  public isLoadingResults = true;
  public pageId = 1;

  constructor(private articleService: ArticleService) { }

  loadArticles(filterArticleCategories: FilterArticleModel): void {

    this.isLoadingResults = true;

    this.articleService.filterArticle(filterArticleCategories)
      .pipe(
        catchError(() => of([])),
        finalize(() => {
        this.isLoadingResults = true;
        })
      )
      .subscribe((res: FilterArticleModel) => {
        setTimeout(() => {
          this.data = res.articles;
          this.resultsLength = res.dataCount;
          this.isLoadingResults = false;
          this.pageId = res.pageId;
        }, 750)
      });

  }
}

