import {FilterCommentModel, CommentModel} from "./_index";
import {CommentService} from "@app_services/comment/comment.service";
import {BaseDataServer} from "@app_models/_common/_index";
import {finalize} from 'rxjs/operators';

export class CommentDataServer extends BaseDataServer<CommentModel, FilterCommentModel> {

  constructor(private commentService: CommentService) {
    super();
  }

  load(filter: FilterCommentModel): void {
    this.loadingOn();

    this.commentService.filterComment(filter)
      .pipe(
        finalize(() => {
          this.loadingOff();
        })
      )
      .subscribe((res: FilterCommentModel) => {
        this.data = res.comments === undefined ? [] : res.comments;
        this.resultsLength = res.dataCount;
        this.pageId = res.pageId;
      });
  }
}

