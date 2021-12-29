import { IPaging, PagingDataSortCreationDateOrder, PagingDataSortIdOrder } from "@app_models/common/IPaging";
import { ProductModel } from "./product";

export class FilterProductModel implements IPaging {
    pageId: number;
    allPagesCount: number;
    takePage: number;
    search: string;
    categoryId: string;
    products: ProductModel[];
    sortCreationDateOrder: PagingDataSortCreationDateOrder = PagingDataSortCreationDateOrder.DES;
    sortIdOrder: PagingDataSortIdOrder = PagingDataSortIdOrder.NotSelected;

    constructor(
        search: string,
        categoryId: string,
        products: ProductModel[],
        pageId: number,
        takePage: number,
        sortCreationDateOrder: PagingDataSortCreationDateOrder,
        sortIdOrder: PagingDataSortIdOrder
        ){
        this.search = search;
        this.categoryId = categoryId;
        this.products = products;
        this.pageId = pageId;
        this.takePage = takePage;
        this.sortCreationDateOrder = sortCreationDateOrder;
        this.sortIdOrder = sortIdOrder;
    }
}