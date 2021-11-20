import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SliderListComponent } from "./slider-list/slider-list.component";

const routes: Routes = [
    { path:'', component:SliderListComponent }
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class SliderRoutingModule { }