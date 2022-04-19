import { AccountModel } from './account';
import { PagingDataSortIdOrder, IPaging, PagingDataSortCreationDateOrder } from '../_common/IPaging';


export class FilterAccountModel implements IPaging {

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
        ){
        this.fullName = fullName;
        this.email = email;
        this.accounts = accounts;
        this.pageId = pageId;
        this.takePage = takePage;
        this.sortCreationDateOrder = sortCreationDateOrder;
        this.sortIdOrder = sortIdOrder;
    }
}
