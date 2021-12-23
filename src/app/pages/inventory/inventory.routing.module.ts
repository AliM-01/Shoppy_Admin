import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import {FilterInventoryPage} from "@apppages/inventory/filter-inventory/filter-inventory.page";
import { CreateInventoryPage } from "./create-inventory-page/create-inventory.page";

const routes: Routes = [
    { path:'', component:FilterInventoryPage },
    { path:'create/:productId', component:CreateInventoryPage }
  ];

  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class InventoryRoutingModule { }
