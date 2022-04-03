import { IPaging, PagingDataSortCreationDateOrder, PagingDataSortIdOrder } from '@app_models/_common/IPaging';
import { InventoryModel } from './inventory';

export class FilterInventoryModel implements IPaging {

    pageId: number;
    allPagesCount: number;
    takePage: number;
    sortCreationDateOrder: PagingDataSortCreationDateOrder;
    sortIdOrder: PagingDataSortIdOrder;
    productTitle: string
    inStockState: FilterInventoryInStockStateEnum
    inventories: InventoryModel[];

    constructor(
        productTitle: string,
        inStockState: FilterInventoryInStockStateEnum,
        inventories: InventoryModel[],
        pageId: number,
        takePage: number,
        sortCreationDateOrder: PagingDataSortCreationDateOrder,
        sortIdOrder: PagingDataSortIdOrder
    ) {
        this.productTitle = productTitle;
        this.inStockState = inStockState
        this.inventories = inventories;
        this.pageId = pageId;
        this.takePage = takePage;
        this.sortCreationDateOrder = sortCreationDateOrder;
        this.sortIdOrder = sortIdOrder;
    }
}

export enum FilterInventoryInStockStateEnum {
    All = "All",
    InStock = "InStock",
    NotInStock  = "NotInStock"
}
