import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from '@app_components/components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DirectivesModule } from '@app_directives/directives.module';
import { ColleagueDiscountService } from '@app_services/discount/colleague-discount/colleague-discount.service';
import { ColleagueDiscountRoutingModule } from './colleague.discount.routing.module';
import { FilterColleagueDiscountPage } from './filter-colleague-discount/filter-colleague-discount.page';
import { DefineColleagueDiscountDialog } from './define-colleague-discount/define-colleague-discount.dialog';
import { EditColleagueDiscountDialog } from './edit-colleague-discount/edit-colleague-discount.dialog';
import { AppMaterialModule } from '@appapp-material.module';


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
    AppMaterialModule,
    ComponentsModule,
    FormsModule,
    ColleagueDiscountRoutingModule,
    DirectivesModule
  ],
  exports: [FilterColleagueDiscountPage],
  schemas: [],
  providers: [ColleagueDiscountService]
})
export class ColleagueDiscountModule { }
