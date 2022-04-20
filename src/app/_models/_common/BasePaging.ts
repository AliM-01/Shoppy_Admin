export enum PagingDataSortIdOrder {
  NotSelected,
  DES,
  ASC
}
export enum PagingDataSortCreationDateOrder {
  DES,
  ASC
}

export class BasePaging {
  pageId: number;
  dataCount: number;
  takePage: number;
  sortCreationDateOrder: PagingDataSortCreationDateOrder;
  sortIdOrder: PagingDataSortIdOrder;
}

