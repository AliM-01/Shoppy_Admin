import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { FilterProductComponent } from './filter-product/filter-product.component';

const routes: Routes = [
    { path:'', component:FilterProductComponent }
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class ProductRoutingModule { }