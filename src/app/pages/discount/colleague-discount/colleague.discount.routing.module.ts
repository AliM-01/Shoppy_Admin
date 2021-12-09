import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { FilterColleagueDiscountComponent } from "./filter-colleague-discount/filter-colleague-discount.component";

const routes: Routes = [
    { path:'', component:FilterColleagueDiscountComponent }
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class ColleagueDiscountRoutingModule { }