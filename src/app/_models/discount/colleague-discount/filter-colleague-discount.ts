import { IPaging, PagingDataSortCreationDateOrder, PagingDataSortIdOrder } from "@app_models/_common/IPaging";
import { ColleagueDiscountModel } from "./colleague-discount";

export class FilterColleagueDiscountModel implements IPaging {
    pageId: number;
    allPagesCount: number;
    takePage: number;
    productId: string;
    productTitle: string;
    discounts: ColleagueDiscountModel[];
    sortCreationDateOrder: PagingDataSortCreationDateOrder = PagingDataSortCreationDateOrder.DES;
    sortIdOrder: PagingDataSortIdOrder = PagingDataSortIdOrder.NotSelected;

    constructor(
        productId: string,
        productTitle: string,
        discounts: ColleagueDiscountModel[],
        pageId: number,
        takePage: number,
        sortCreationDateOrder: PagingDataSortCreationDateOrder,
        sortIdOrder: PagingDataSortIdOrder
        ){
        this.productId = productId;
        this.productTitle = productTitle;
        this.discounts = discounts;
        this.pageId = pageId;
        this.takePage = takePage;
        this.sortCreationDateOrder = sortCreationDateOrder;
        this.sortIdOrder = sortIdOrder;
    }
}