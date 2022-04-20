import {NgModule} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";
import {FilterAccountPage} from "./filter-account/filter-account.page";

const routes: Routes = [
  {path:'', component:FilterAccountPage}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
