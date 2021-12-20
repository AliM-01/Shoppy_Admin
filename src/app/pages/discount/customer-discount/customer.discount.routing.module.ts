import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DefineCustomerDiscountPage } from "./define-customer-discount/define-customer-discount.page";
import { FilterCustomerDiscountPage } from "./filter-customer-discount/filter-customer-discount.page";

const routes: Routes = [
    { path:'', component:FilterCustomerDiscountPage },
    { path:'define/:productId', component:DefineCustomerDiscountPage }
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class CustomerDiscountRoutingModule { }