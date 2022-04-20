import {ArticleModel} from "./article";
import {BasePaging, PagingDataSortCreationDateOrder, PagingDataSortIdOrder} from '@app_models/_common/_index';

export class FilterArticleModel extends BasePaging {

  title: string;
  categoryId: string;
  articles: ArticleModel[];

  constructor(
    title: string,
    categoryId: string,
    pageId: number,
    takePage: number,
    sortCreationDateOrder: PagingDataSortCreationDateOrder,
    sortIdOrder: PagingDataSortIdOrder
  ) {
    super();
    this.title = title;
    this.categoryId = categoryId;
    this.pageId = pageId;
    this.takePage = takePage;
    this.sortCreationDateOrder = sortCreationDateOrder;
    this.sortIdOrder = sortIdOrder;
  }
}
