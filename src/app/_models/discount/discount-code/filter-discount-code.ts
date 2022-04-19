import { BasePaging, PagingDataSortCreationDateOrder, PagingDataSortIdOrder } from "@app_models/_common/BasePaging";
import { DiscountCodeModel } from "./discount-code";

export class FilterDiscountCodeModel extends BasePaging {

  pageId: number;
  dataCount: number;
  takePage: number;
  phrase: string;
  discounts: DiscountCodeModel[];
  sortCreationDateOrder: PagingDataSortCreationDateOrder = PagingDataSortCreationDateOrder.DES;
  sortIdOrder: PagingDataSortIdOrder = PagingDataSortIdOrder.NotSelected;

  constructor(
    phrase: string,
    discounts: DiscountCodeModel[],
    pageId: number,
    takePage: number,
    sortCreationDateOrder: PagingDataSortCreationDateOrder,
    sortIdOrder: PagingDataSortIdOrder
  ) {
    super();
    this.phrase = phrase;
    this.discounts = discounts;
    this.pageId = pageId;
    this.takePage = takePage;
    this.sortCreationDateOrder = sortCreationDateOrder;
    this.sortIdOrder = sortIdOrder;
  }
}
