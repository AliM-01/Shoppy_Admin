import {FilterArticleModel, ArticleModel} from "./_index";
import {finalize} from 'rxjs/operators';
import {ArticleService} from "@app_services/blog/article/article.service";
import {BaseDataServer} from "@app_models/_common/BaseDataServer";

export class ArticleDataServer extends BaseDataServer<ArticleModel, FilterArticleModel> {

  constructor(private articleService: ArticleService) {
    super();
  }

  load(filter: FilterArticleModel): void {
    this.loadingOn();

    this.articleService.filterArticle(filter)
      .pipe(
        finalize(() => {
          this.loadingOff();
        })
      )
      .subscribe((res: FilterArticleModel) => {
        this.data = res.articles === undefined ? [] : res.articles;
        this.resultsLength = res.dataCount;
        this.pageId = res.pageId;
      });
  }


}

