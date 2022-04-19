import { BasePaging, PagingDataSortCreationDateOrder, PagingDataSortIdOrder } from "@app_models/_common/BasePaging";
import { ProductDiscountModel } from "./product-discount";

export class FilterProductDiscountModel extends BasePaging {

  pageId: number;
  dataCount: number;
  takePage: number;
  productId: string;
  productTitle: string;
  discounts: ProductDiscountModel[];
  sortCreationDateOrder: PagingDataSortCreationDateOrder = PagingDataSortCreationDateOrder.DES;
  sortIdOrder: PagingDataSortIdOrder = PagingDataSortIdOrder.NotSelected;

  constructor(
    productId: string,
    productTitle: string,
    discounts: ProductDiscountModel[],
    pageId: number,
    takePage: number,
    sortCreationDateOrder: PagingDataSortCreationDateOrder,
    sortIdOrder: PagingDataSortIdOrder
  ) {
    super();
    this.productId = productId;
    this.productTitle = productTitle;
    this.discounts = discounts;
    this.pageId = pageId;
    this.takePage = takePage;
    this.sortCreationDateOrder = sortCreationDateOrder;
    this.sortIdOrder = sortIdOrder;
  }
}
