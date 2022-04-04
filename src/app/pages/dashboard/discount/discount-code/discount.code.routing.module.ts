import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { FilterDiscountCodePage } from "./filter-discount-code/filter-discount-code.page";

const routes: Routes = [
    { path:'', component:FilterDiscountCodePage },
  ];

  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class DiscountCodeRoutingModule { }
