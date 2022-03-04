import { IPaging, PagingDataSortCreationDateOrder, PagingDataSortIdOrder } from "@app_models/_common/IPaging";
import { DiscountCodeModel } from "./discount-code";

export class FilterDiscountCodeModel implements IPaging {

    pageId: number;
    allPagesCount: number;
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
        ){
        this.phrase = phrase;
        this.discounts = discounts;
        this.pageId = pageId;
        this.takePage = takePage;
        this.sortCreationDateOrder = sortCreationDateOrder;
        this.sortIdOrder = sortIdOrder;
    }
}
