import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SliderListPage } from "./slider-list/slider-list.page";

const routes: Routes = [
    { path:'', component:SliderListPage }
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class SliderRoutingModule { }