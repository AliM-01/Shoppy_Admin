import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from '@app_components/components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DirectivesModule } from '@app_directives/directives.module';
import { PipesModule } from '@app_pipes/pipes.module';
import { AppMaterialModule } from '@app/app-material.module';
import { OrderService } from '@app_services/order/order.service';
import { OrderRoutingModule } from './order.routing.module';
import { FilterOrderPage } from './filter-order/filter-order.page';

@NgModule({
  declarations: [
    FilterOrderPage
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    OrderRoutingModule,
    ComponentsModule,
    FormsModule,
    AppMaterialModule,
    DirectivesModule,
    PipesModule
  ],
  exports: [],
  schemas: [],
  providers: [OrderService]
})
export class OrderModule { }
