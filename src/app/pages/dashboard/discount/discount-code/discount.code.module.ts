import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ComponentsModule} from '@app_components/components.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DiscountCodeService} from '@app_services/discount/discount-code/discount-code.service';
import {FilterDiscountCodePage} from './filter-discount-code/filter-discount-code.page';
import {NgPersianDatepickerModule} from 'ng-persian-datepicker';
import {DefineDiscountCodeDialog} from './define-discount-code-dialog/define-discount-code.dialog';
import {DirectivesModule} from '@app_directives/directives.module';
import {EditDiscountCodeDialog} from './edit-discount-code-dialog/edit-discount-code.dialog';
import {AppMaterialModule} from '@appapp-material.module';
import {DiscountCodeRoutingModule} from './discount.code.routing.module';

@NgModule({
  declarations: [
    FilterDiscountCodePage,
    DefineDiscountCodeDialog,
    EditDiscountCodeDialog
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    DiscountCodeRoutingModule,
    ComponentsModule,
    AppMaterialModule,
    FormsModule,
    DirectivesModule,
    NgPersianDatepickerModule
  ],
  exports: [FilterDiscountCodePage],
  schemas: [],
  providers: [DiscountCodeService]
})
export class DiscountCodeModule { }
