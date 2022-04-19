import { BasePaging, PagingDataSortCreationDateOrder, PagingDataSortIdOrder } from "@app_models/_common/BasePaging";
import { ProductCategoryModel } from "./product-category";

export class FilterProductCategoryModel extends BasePaging {

  pageId: number;
  dataCount: number;
  takePage: number;
  sortCreationDateOrder: PagingDataSortCreationDateOrder;
  sortIdOrder: PagingDataSortIdOrder;
  title: string;
  productCategories: ProductCategoryModel[];

  constructor(
    title: string,
    productCategories: ProductCategoryModel[],
    pageId: number,
    takePage: number,
    sortCreationDateOrder: PagingDataSortCreationDateOrder,
    sortIdOrder: PagingDataSortIdOrder
  ) {
    super();
    this.title = title;
    this.productCategories = productCategories;
    this.pageId = pageId;
    this.takePage = takePage;
    this.sortCreationDateOrder = sortCreationDateOrder;
    this.sortIdOrder = sortIdOrder;
  }
}
