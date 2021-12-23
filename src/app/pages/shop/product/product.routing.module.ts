import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { FilterProductPage } from './filter-product/filter-product.page';
import { ProductPicturePage } from "./product-picture/product-picture.page";

const routes: Routes = [
    { path:'', component:FilterProductPage },
  { path: 'gallery/:productId', component: ProductPicturePage }

  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes),],
    exports: [RouterModule]
  })
  export class ProductRoutingModule { }