import { IPaging, PagingDataSortCreationDateOrder, PagingDataSortIdOrder } from "@app_models/common/IPaging";
import { CustomerDiscountModel } from "./customer-discount";

export class FilterCustomerDiscountModel implements IPaging {

    pageId: number;
    allPagesCount: number;
    takePage: number;
    productId: number;
    productTitle: string;
    discounts: CustomerDiscountModel[];
    sortCreationDateOrder: PagingDataSortCreationDateOrder = PagingDataSortCreationDateOrder.DES;
    sortIdOrder: PagingDataSortIdOrder = PagingDataSortIdOrder.NotSelected;

    constructor(
        productId: number,
        productTitle: string,
        discounts: CustomerDiscountModel[],
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