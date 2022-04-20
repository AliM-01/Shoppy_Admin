import {BasePaging, PagingDataSortCreationDateOrder, PagingDataSortIdOrder} from "@app_models/_common/_index";
import {DiscountCodeModel} from "./discount-code";

export class FilterDiscountCodeModel extends BasePaging {

  phrase: string;
  discounts: DiscountCodeModel[];

  constructor(
    phrase: string,
    pageId: number,
    takePage: number,
    sortCreationDateOrder: PagingDataSortCreationDateOrder,
    sortIdOrder: PagingDataSortIdOrder
  ) {
    super();
    this.phrase = phrase;
    this.pageId = pageId;
    this.takePage = takePage;
    this.sortCreationDateOrder = sortCreationDateOrder;
    this.sortIdOrder = sortIdOrder;
  }
}
