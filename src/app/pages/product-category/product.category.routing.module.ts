import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CreateProductCategoryComponent } from "./create-product-category/create-product-category.component";
import { FilterProductCategoryComponent } from "./filter-product-category/filter-product-category.component";

const routes: Routes = [
    { path:'', component:FilterProductCategoryComponent },
    { path:'create', component:CreateProductCategoryComponent },
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class ProductCategoryRoutingModule { }