import {NgModule} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";
import {FilterOrderPage} from "./filter-order/filter-order.page";
import {OrderItemsPage} from "./order-items/order-items.page";

const routes: Routes = [
  {path: '', component: FilterOrderPage},
  {path:'items/:id', component:OrderItemsPage}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
