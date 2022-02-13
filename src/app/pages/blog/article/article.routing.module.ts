import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CreateArticlePage } from "./create-article/create-article.page";
import { FilterArticlePage } from "./filter-article/filter-article.page";

const routes: Routes = [
  { path:'', component:FilterArticlePage },
  { path:'create', component:CreateArticlePage }
];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class ArticleRoutingModule { }