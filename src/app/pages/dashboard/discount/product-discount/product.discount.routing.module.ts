import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DefineProductDiscountPage } from "./define-product-discount/define-product-discount.page";
import { FilterProductDiscountPage } from "./filter-product-discount/filter-product-discount.page";

const routes: Routes = [
    { path:'', component:FilterProductDiscountPage },
    { path:'define/:productId', component:DefineProductDiscountPage }
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class ProductDiscountRoutingModule { }