import {ArticleCategoryModel} from "./article-category";
import {BasePaging, PagingDataSortCreationDateOrder, PagingDataSortIdOrder} from '@app_models/_common/_index';

export class FilterArticleCategoryModel extends BasePaging {

  pageId: number;
  dataCount: number;
  takePage: number;
  sortCreationDateOrder: PagingDataSortCreationDateOrder;
  sortIdOrder: PagingDataSortIdOrder;
  title: string;
  articleCategories: ArticleCategoryModel[];

  constructor(
    title: string,
    articleCategories: ArticleCategoryModel[],
    pageId: number,
    takePage: number,
    sortCreationDateOrder: PagingDataSortCreationDateOrder,
    sortIdOrder: PagingDataSortIdOrder
  ) {
    super();
    this.title = title;
    this.articleCategories = articleCategories;
    this.pageId = pageId;
    this.takePage = takePage;
    this.sortCreationDateOrder = sortCreationDateOrder;
    this.sortIdOrder = sortIdOrder;
  }
}
