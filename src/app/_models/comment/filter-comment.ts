import {BasePaging} from '@app_models/_common/_index';
import {CommentModel} from './comment';

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

export class FilterCommentModel extends BasePaging {

  type: FilterCommentType = FilterCommentType.All;
  state: FilterCommentState = FilterCommentState.All;
  comments: CommentModel[];

  constructor(
    type: FilterCommentType,
    state: FilterCommentState,
    pageId: number,
    takePage: number
  ) {
    super();
    this.type = type;
    this.state = state;
    this.pageId = pageId;
    this.takePage = takePage;
  }
}

