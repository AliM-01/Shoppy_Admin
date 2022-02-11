import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { FilterArticlePage } from "./filter-article/filter-article.page";

const routes: Routes = [
  { path:'', component:FilterArticlePage },
];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class ArticleRoutingModule { }