import { AccountModel } from './account';
import { PagingDataSortIdOrder, BasePaging, PagingDataSortCreationDateOrder } from '@app_models/_common/_index';


export class FilterAccountModel extends BasePaging {

  pageId: number;
  dataCount: number;
  takePage: number;
  sortCreationDateOrder: PagingDataSortCreationDateOrder;
  sortIdOrder: PagingDataSortIdOrder;
  fullName: string;
  email: string;
  accounts: AccountModel[];

  constructor(
    fullName: string,
    email: string,
    accounts: AccountModel[],
    pageId: number,
    takePage: number,
    sortCreationDateOrder: PagingDataSortCreationDateOrder,
    sortIdOrder: PagingDataSortIdOrder
  ) {
    super();
    this.fullName = fullName;
    this.email = email;
    this.accounts = accounts;
    this.pageId = pageId;
    this.takePage = takePage;
    this.sortCreationDateOrder = sortCreationDateOrder;
    this.sortIdOrder = sortIdOrder;
  }
}
