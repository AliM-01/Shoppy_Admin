import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { FilterCustomerDiscountComponent } from "./filter-customer-discount/filter-customer-discount.component";

const routes: Routes = [
    { path:'', component:FilterCustomerDiscountComponent }
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class CustomerDiscountRoutingModule { }