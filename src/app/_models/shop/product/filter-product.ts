import { BasePaging, PagingDataSortCreationDateOrder, PagingDataSortIdOrder } from "@app_models/_common/BasePaging";
import { ProductModel } from "./product";

export class FilterProductModel extends BasePaging {
  pageId: number;
  dataCount: number;
  takePage: number;
  search: string;
  categoryId: string;
  products: ProductModel[];
  sortCreationDateOrder: PagingDataSortCreationDateOrder = PagingDataSortCreationDateOrder.DES;
  sortIdOrder: PagingDataSortIdOrder = PagingDataSortIdOrder.NotSelected;

  constructor(
    search: string,
    categoryId: string,
    products: ProductModel[],
    pageId: number,
    takePage: number,
    sortCreationDateOrder: PagingDataSortCreationDateOrder,
    sortIdOrder: PagingDataSortIdOrder
  ) {
    super();
    this.search = search;
    this.categoryId = categoryId;
    this.products = products;
    this.pageId = pageId;
    this.takePage = takePage;
    this.sortCreationDateOrder = sortCreationDateOrder;
    this.sortIdOrder = sortIdOrder;
  }
}
