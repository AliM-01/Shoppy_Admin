import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import {FilterInventoryComponent} from "@apppages/inventory/filter-inventory/filter-inventory.component";

const routes: Routes = [
    { path:'', component:FilterInventoryComponent }
  ];

  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class InventoryRoutingModule { }
