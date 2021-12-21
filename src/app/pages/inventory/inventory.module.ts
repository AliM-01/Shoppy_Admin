import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from '@app_components/components.module';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatRadioModule} from '@angular/material/radio'; 
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { DirectivesModule } from '@app_directives/directives.module';
import { InventoryService } from '@app_services/inventory/inventory.service';
import {InventoryRoutingModule} from "@apppages/inventory/inventory.routing.module";
import {FilterInventoryPage} from "@apppages/inventory/filter-inventory/filter-inventory.page";
import { CreateInventoryDialog } from './create-inventory/create-inventory.dialog';
import { EditInventoryDialog } from './edit-inventory/edit-inventory.dialog';
import { IncreaseInventoryDialog } from './increase-inventory/increase-inventory.dialog';

@NgModule({
  declarations: [
    FilterInventoryPage,
    CreateInventoryDialog,
    EditInventoryDialog,
    IncreaseInventoryDialog
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    InventoryRoutingModule,
    ComponentsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatRadioModule,
    DirectivesModule
  ],
  exports: [FilterInventoryPage],
  schemas: [],
  providers: [InventoryService]
})
export class InventoryModule { }
