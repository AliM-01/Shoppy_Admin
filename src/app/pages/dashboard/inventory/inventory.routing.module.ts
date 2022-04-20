import {NgModule} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";
import {FilterInventoryPage} from "@app/pages/dashboard/inventory/filter-inventory/filter-inventory.page";
import {InventoryDetailsPage} from "./inventory-details/inventory-details.page";

const routes: Routes = [
    {path:'', component:FilterInventoryPage},
    {path:'details/:id', component:InventoryDetailsPage}
  ];

  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class InventoryRoutingModule { }
