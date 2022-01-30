import { FilterCommentModel, CommentModel } from "./_index";
import { IResponse } from '@app_models/_common/IResponse';
import { CommentService } from "@app_services/comment/comment.service";
export class CommentDataServer {

    constructor(private commentService: CommentService) { }

    public data: CommentModel[] = [];
    public resultsLength = 0;
    public isLoadingResults = true;
    public pageId: number = 1;

    loadComments(filterComments: FilterCommentModel) {
        this.isLoadingResults = true;

        this.commentService.filterComment(filterComments)
        .subscribe((res : IResponse<FilterCommentModel>) => {
            if (res.status === 'success' || res.status === 'no-content') {
                setTimeout(() => {
                    this.data = res.data.comments;
                    this.resultsLength = res.data.allPagesCount;
                    this.isLoadingResults = false;
                    this.pageId = res.data.pageId;

                }, 750)
            }
        });

    } 
}

