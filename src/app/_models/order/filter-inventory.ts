import { BasePaging, PagingDataSortCreationDateOrder, PagingDataSortIdOrder } from '@app_models/_common/BasePaging';
import { OrderModel } from './order';

export class FilterOrderModel extends BasePaging {

  pageId: number;
  dataCount: number;
  takePage: number;
  sortCreationDateOrder: PagingDataSortCreationDateOrder;
  sortIdOrder: PagingDataSortIdOrder;

  userNames: string
  paymentState: FilterOrderPaymentStatus
  orders: OrderModel[];

  constructor(
    userNames: string,
    paymentState: FilterOrderPaymentStatus,
    orders: OrderModel[],
    pageId: number,
    takePage: number,
    sortCreationDateOrder: PagingDataSortCreationDateOrder,
    sortIdOrder: PagingDataSortIdOrder
  ) {
    super();
    this.userNames = userNames;
    this.paymentState = paymentState;
    this.orders = orders;
    this.pageId = pageId;
    this.takePage = takePage;
    this.sortCreationDateOrder = sortCreationDateOrder;
    this.sortIdOrder = sortIdOrder;
  }
}

export enum FilterOrderPaymentStatus {
  All = "All",
  IsPaid = "IsPaid",
  PaymentPending = "PaymentPending",
  IsCanceled = "IsCanceled"
}
