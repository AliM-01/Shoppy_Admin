import { BasePaging, PagingDataSortCreationDateOrder, PagingDataSortIdOrder } from '@app_models/_common/_index';
import { CommentModel } from './comment';

export class FilterCommentModel extends BasePaging {

  pageId: number;
  dataCount: number;
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
    super();
    this.type = type;
    this.state = state
    this.comments = comments;
    this.pageId = pageId;
    this.takePage = takePage;
  }
}

export enum FilterCommentState {
  All = "All",
  UnderProgress = "UnderProgress",
  Canceled = "Canceled",
  Confirmed = "Confirmed"
}

export enum FilterCommentType {
  All = "All",
  Product = "Product",
  Article = "Article"
}
