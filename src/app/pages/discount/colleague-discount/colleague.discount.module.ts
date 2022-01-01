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
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'; 
import { DirectivesModule } from '@app_directives/directives.module';
import { ColleagueDiscountService } from '@app_services/discount/colleague-discount/colleague-discount.service';
import { ColleagueDiscountRoutingModule } from './colleague.discount.routing.module';
import { FilterColleagueDiscountPage } from './filter-colleague-discount/filter-colleague-discount.page';
import { DefineColleagueDiscountDialog } from './define-colleague-discount/define-colleague-discount.dialog';
import { EditColleagueDiscountDialog } from './edit-colleague-discount/edit-colleague-discount.dialog';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
  declarations: [
    FilterColleagueDiscountPage,
    DefineColleagueDiscountDialog,
    EditColleagueDiscountDialog
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    ComponentsModule,
    FormsModule,
    ColleagueDiscountRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    DirectivesModule
  ],
  exports: [FilterColleagueDiscountPage],
  schemas: [],
  providers: [ColleagueDiscountService]
})
export class ColleagueDiscountModule { }
