import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { FilterProductFeaturePage } from "./filter-product-feature/filter-product-feature.page";

const routes: Routes = [
  { path: '/:productId', component: FilterProductFeaturePage }

  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class ProductFeatureRoutingModule { }