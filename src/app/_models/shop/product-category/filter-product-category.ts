import {BasePaging, PagingDataSortCreationDateOrder, PagingDataSortIdOrder} from "@app_models/_common/_index";
import {ProductCategoryModel} from "./product-category";

export class FilterProductCategoryModel extends BasePaging {

  title: string;
  productCategories: ProductCategoryModel[];

  constructor(
    title: string,
    pageId: number,
    takePage: number,
    sortCreationDateOrder: PagingDataSortCreationDateOrder,
    sortIdOrder: PagingDataSortIdOrder
  ) {
    super();
    this.title = title;
    this.pageId = pageId;
    this.takePage = takePage;
    this.sortCreationDateOrder = sortCreationDateOrder;
    this.sortIdOrder = sortIdOrder;
  }
}
