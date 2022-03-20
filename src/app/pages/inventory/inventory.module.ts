import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from '@app_components/components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DirectivesModule } from '@app_directives/directives.module';
import { InventoryService } from '@app_services/inventory/inventory.service';
import {InventoryRoutingModule} from "@apppages/inventory/inventory.routing.module";
import {FilterInventoryPage} from "@apppages/inventory/filter-inventory/filter-inventory.page";
import { EditInventoryDialog } from './edit-inventory/edit-inventory.dialog';
import { IncreaseInventoryDialog } from './increase-inventory/increase-inventory.dialog';
import { ReduceInventoryDialog } from './reduce-inventory/reduce-inventory.dialog';
import { InventoryOperationDialog } from './inventory-operations/inventory-operations.dialog';
import { PipesModule } from '@app_pipes/pipes.module';
import { AppMaterialModule } from '@appapp-material.module';
import { ProductService } from '@app_services/shop/product/product.service';

@NgModule({
  declarations: [
    FilterInventoryPage,
    EditInventoryDialog,
    IncreaseInventoryDialog,
    ReduceInventoryDialog,
    InventoryOperationDialog
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    InventoryRoutingModule,
    ComponentsModule,
    FormsModule,
    AppMaterialModule,
    DirectivesModule,
    PipesModule
  ],
  exports: [FilterInventoryPage],
  schemas: [],
  providers: [InventoryService,ProductService]
})
export class InventoryModule { }
