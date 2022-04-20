import {BasePaging, PagingDataSortCreationDateOrder, PagingDataSortIdOrder} from '@app_models/_common/_index';
import {InventoryModel} from './inventory';

export enum FilterInventoryInStockStateEnum {
  All = "All",
  InStock = "InStock",
  NotInStock = "NotInStock"
}

export class FilterInventoryModel extends BasePaging {

  productTitle: string
  inStockState: FilterInventoryInStockStateEnum
  inventories: InventoryModel[];

  constructor(
    productTitle: string,
    inStockState: FilterInventoryInStockStateEnum,
    pageId: number,
    takePage: number,
    sortCreationDateOrder: PagingDataSortCreationDateOrder,
    sortIdOrder: PagingDataSortIdOrder
  ) {
    super();
    this.productTitle = productTitle;
    this.inStockState = inStockState
    this.pageId = pageId;
    this.takePage = takePage;
    this.sortCreationDateOrder = sortCreationDateOrder;
    this.sortIdOrder = sortIdOrder;
  }
}


