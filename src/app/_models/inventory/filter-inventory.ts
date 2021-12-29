import { IPaging, PagingDataSortCreationDateOrder, PagingDataSortIdOrder } from '@app_models/common/IPaging';
import { InventoryModel } from './inventory';

export class FilterInventoryModel implements IPaging {

    pageId: number;
    allPagesCount: number;
    takePage: number;
    sortCreationDateOrder: PagingDataSortCreationDateOrder;
    sortIdOrder: PagingDataSortIdOrder;
    productId: number
    inStockState: FilterInventoryInStockStateEnum
    inventories: InventoryModel[];

    constructor(
        productId: number,
        inStockState: FilterInventoryInStockStateEnum,
        inventories: InventoryModel[],
        pageId: number,
        takePage: number,
        sortCreationDateOrder: PagingDataSortCreationDateOrder,
        sortIdOrder: PagingDataSortIdOrder
    ) {
        this.productId = productId;
        this.inStockState = inStockState
        this.inventories = inventories;
        this.pageId = pageId;
        this.takePage = takePage;
        this.sortCreationDateOrder = sortCreationDateOrder;
        this.sortIdOrder = sortIdOrder;
    }
}

export enum FilterInventoryInStockStateEnum {
    All,
    InStock,
    NotInStock
}