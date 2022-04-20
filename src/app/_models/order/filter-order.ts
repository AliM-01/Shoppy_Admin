import {BasePaging, PagingDataSortCreationDateOrder, PagingDataSortIdOrder} from '@app_models/_common/_index';
import {OrderModel} from './order';

export enum FilterOrderPaymentStatus {
  All = "All",
  IsPaid = "IsPaid",
  PaymentPending = "PaymentPending",
  IsCanceled = "IsCanceled"
}

export class FilterOrderModel extends BasePaging {

  userNames: string
  paymentState: FilterOrderPaymentStatus;
  orders: OrderModel[];

  constructor(
    userNames: string,
    paymentState: FilterOrderPaymentStatus,
    pageId: number,
    takePage: number,
    sortCreationDateOrder: PagingDataSortCreationDateOrder,
    sortIdOrder: PagingDataSortIdOrder
  ) {
    super();
    this.userNames = userNames;
    this.paymentState = paymentState;
    this.pageId = pageId;
    this.takePage = takePage;
    this.sortCreationDateOrder = sortCreationDateOrder;
    this.sortIdOrder = sortIdOrder;
  }
}
