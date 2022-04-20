import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ComponentsModule} from '@app_components/components.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DirectivesModule} from '@app_directives/directives.module';
import {PipesModule} from '@app_pipes/pipes.module';
import {AppMaterialModule} from '@app/app-material.module';
import {AccountService} from '@app_services/account/account.service';
import {AccountRoutingModule} from './account.routing.module';
import {FilterAccountPage} from './filter-account/filter-account.page';

@NgModule({
  declarations: [FilterAccountPage],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    AccountRoutingModule,
    ComponentsModule,
    FormsModule,
    AppMaterialModule,
    DirectivesModule,
    PipesModule
  ],
  exports: [],
  schemas: [],
  providers: [AccountService]
})
export class AccountModule { }
