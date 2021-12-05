import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DefineCustomerDiscountComponent } from "./define-customer-discount/define-customer-discount.component";
import { FilterCustomerDiscountComponent } from "./filter-customer-discount/filter-customer-discount.component";

const routes: Routes = [
    { path:'', component:FilterCustomerDiscountComponent },
    { path:'define/:productId', component:DefineCustomerDiscountComponent }
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class CustomerDiscountRoutingModule { }