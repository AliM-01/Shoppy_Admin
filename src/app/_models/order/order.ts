export class OrderModel {
  id: string;
  accountId: string;
  userFullName: string;
  totalAmount: number;
  discountAmount: number;
  paymentAmount: number;
  isPaid: boolean;
  isCanceled: boolean;
  issueTrackingNo: string;
  refId: number;
  creationDate: string;
}
