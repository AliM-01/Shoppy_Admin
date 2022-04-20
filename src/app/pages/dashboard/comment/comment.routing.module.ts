import {NgModule} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";
import {FilterCommentPage} from "./filter-comment/filter-comment.page";

const routes: Routes = [
  {path: '', component: FilterCommentPage}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommentRoutingModule { }
