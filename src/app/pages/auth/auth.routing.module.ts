import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginPage } from '@app/pages/auth/login/login.page';
import { AccessDeniedPage } from "./accessDenied/access-denied.page";

const routes: Routes = [
  { path: 'login', component: LoginPage },
  { path: 'access-denied', component: AccessDeniedPage }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
