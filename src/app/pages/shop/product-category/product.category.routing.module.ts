import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CreateProductCategoryComponent } from "./create-product-category/create-product-category.component";
import { FilterProductCategoryPage } from "./filter-product-category/filter-product-category.page";

const routes: Routes = [
    { path:'', component:FilterProductCategoryPage },
    { path:'create', component:CreateProductCategoryComponent },
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class ProductCategoryRoutingModule { }