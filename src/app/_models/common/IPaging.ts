export interface IPaging {
    pageId:number;
    allPagesCount:number;
    takePage:number;
    sortCreationDateOrder: PagingDataSortCreationDateOrder;
    sortIdOrder: PagingDataSortIdOrder;
}

export enum PagingDataSortIdOrder
{
    NotSelected,
    DES,
    ASC
}
export enum PagingDataSortCreationDateOrder
{
    DES,
    ASC
}