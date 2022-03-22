import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { FilterOrderPage } from "./filter-order/filter-order.page";

const routes: Routes = [
  { path: '', component: FilterOrderPage },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
