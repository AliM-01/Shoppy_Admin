import { IPaging, PagingDataSortCreationDateOrder, PagingDataSortIdOrder } from '@app_models/_common/IPaging';
import { OrderModel } from './order';

export class FilterOrderModel implements IPaging {

    pageId: number;
    allPagesCount: number;
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
    PaymentPending  = "PaymentPending",
    IsCanceled  = "IsCanceled"
}
