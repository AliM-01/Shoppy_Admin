import {BasePaging, PagingDataSortCreationDateOrder, PagingDataSortIdOrder} from "@app_models/_common/_index";
import {ProductModel} from "./product";

export class FilterProductModel extends BasePaging {
  search: string;
  categoryId: string;
  products: ProductModel[];

  constructor(
    search: string,
    categoryId: string,
    pageId: number,
    takePage: number,
    sortCreationDateOrder: PagingDataSortCreationDateOrder,
    sortIdOrder: PagingDataSortIdOrder
  ) {
    super();
    this.search = search;
    this.categoryId = categoryId;
    this.pageId = pageId;
    this.takePage = takePage;
    this.sortCreationDateOrder = sortCreationDateOrder;
    this.sortIdOrder = sortIdOrder;
  }
}
