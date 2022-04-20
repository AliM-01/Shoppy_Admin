import {BasePaging, PagingDataSortCreationDateOrder, PagingDataSortIdOrder} from "@app_models/_common/_index";
import {ProductDiscountModel} from "./product-discount";

export class FilterProductDiscountModel extends BasePaging {

  productId: string;
  productTitle: string;
  discounts: ProductDiscountModel[];

  constructor(
    productId: string,
    productTitle: string,
    pageId: number,
    takePage: number,
    sortCreationDateOrder: PagingDataSortCreationDateOrder,
    sortIdOrder: PagingDataSortIdOrder
  ) {
    super();
    this.productId = productId;
    this.productTitle = productTitle;
    this.pageId = pageId;
    this.takePage = takePage;
    this.sortCreationDateOrder = sortCreationDateOrder;
    this.sortIdOrder = sortIdOrder;
  }
}
