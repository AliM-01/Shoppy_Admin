import { BasePaging, PagingDataSortCreationDateOrder, PagingDataSortIdOrder } from '@app_models/_common/_index';
import { InventoryModel } from './inventory';

export class FilterInventoryModel extends BasePaging {

  pageId: number;
  dataCount: number;
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
    super();
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
  NotInStock = "NotInStock"
}
