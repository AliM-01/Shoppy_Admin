import {FilterCommentModel, CommentModel} from "./_index";
import {CommentService} from "@app_services/comment/comment.service";

export class CommentDataServer {

  constructor(private commentService: CommentService) { }

  public data: CommentModel[] = [];
  public resultsLength = 0;
  public isLoadingResults = true;
  public pageId = 1;

  loadComments(filterComments: FilterCommentModel): void {
    this.isLoadingResults = true;

    this.commentService.filterComment(filterComments)
      .subscribe((res: FilterCommentModel) => {
        setTimeout(() => {
          this.data = res.comments;
          this.resultsLength = res.dataCount;
          this.isLoadingResults = false;
          this.pageId = res.pageId;

        }, 750)
      });

  }
}

