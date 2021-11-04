import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { FilterProductCategoryComponent } from "./filter-product-category/filter-product-category.component";

const routes: Routes = [
    { path:'', component:FilterProductCategoryComponent },
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class ProductCategoryRoutingModule { }