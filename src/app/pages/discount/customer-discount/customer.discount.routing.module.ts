import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DefineCustomerDiscountComponent } from "./define-customer-discount/define-customer-discount.component";
import { FilterCustomerDiscountPage } from "./filter-customer-discount/filter-customer-discount.page";

const routes: Routes = [
    { path:'', component:FilterCustomerDiscountPage },
    { path:'define/:productId', component:DefineCustomerDiscountComponent }
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class CustomerDiscountRoutingModule { }