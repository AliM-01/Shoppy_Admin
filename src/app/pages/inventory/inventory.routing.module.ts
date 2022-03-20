import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import {FilterInventoryPage} from "@apppages/inventory/filter-inventory/filter-inventory.page";

const routes: Routes = [
    { path:'', component:FilterInventoryPage }
  ];

  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class InventoryRoutingModule { }
