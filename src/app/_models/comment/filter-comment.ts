import { IPaging, PagingDataSortCreationDateOrder, PagingDataSortIdOrder } from '@app_models/_common/IPaging';
import { CommentModel } from './comment';

export class FilterCommentModel implements IPaging {

    pageId: number;
    allPagesCount: number;
    takePage: number;
    sortCreationDateOrder: PagingDataSortCreationDateOrder;
    sortIdOrder: PagingDataSortIdOrder;

    type: FilterCommentType = FilterCommentType.All;
    state: FilterCommentState = FilterCommentState.All;
    comments: CommentModel[];

    constructor(
        type: FilterCommentType,
        state: FilterCommentState,
        comments: CommentModel[],
        pageId: number,
        takePage: number
    ) {
        this.type = type;
        this.state = state
        this.comments = comments;
        this.pageId = pageId;
        this.takePage = takePage;
    }
}

export enum FilterCommentState {
    All,
    Canceled,
    Confirmed
}

export enum FilterCommentType {
    All,
    Product,
    Article
}