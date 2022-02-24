import { IPaging, PagingDataSortCreationDateOrder, PagingDataSortIdOrder } from "@app_models/_common/IPaging";
import { ProductDiscountModel } from "./product-discount";

export class FilterProductDiscountModel implements IPaging {

    pageId: number;
    allPagesCount: number;
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