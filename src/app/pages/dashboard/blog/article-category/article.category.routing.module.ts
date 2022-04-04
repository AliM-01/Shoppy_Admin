import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { FilterArticleCategoryPage } from "./filter-article-category/filter-article-category.page";

const routes: Routes = [
  { path:'', component:FilterArticleCategoryPage },
];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class ArticleCategoryRoutingModule { }