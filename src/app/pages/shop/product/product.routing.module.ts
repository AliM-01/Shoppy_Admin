import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { FilterProductComponent } from './filter-product/filter-product.component';
import { ProductPictureComponent } from "./product-picture/product-picture.component";

const routes: Routes = [
    { path:'', component:FilterProductComponent },
  { path: 'gallery/:productId/:productTitle', component: ProductPictureComponent }

  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class ProductRoutingModule { }