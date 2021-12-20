import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { FilterColleagueDiscountPage } from "./filter-colleague-discount/filter-colleague-discount.page";

const routes: Routes = [
    { path:'', component:FilterColleagueDiscountPage }
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class ColleagueDiscountRoutingModule { }