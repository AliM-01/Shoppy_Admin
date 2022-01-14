import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from '@app_components/components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomerDiscountService } from '@app_services/discount/customer-discount/customer-discount.service';
import { CustomerDiscountRoutingModule } from './customer.discount.routing.module';
import { FilterCustomerDiscountPage } from './filter-customer-discount/filter-customer-discount.page';
import { NgPersianDatepickerModule } from 'ng-persian-datepicker';
import { DefineCustomerDiscountDialog } from './define-customer-discount-dialog/define-customer-discount.dialog';
import { DefineCustomerDiscountPage } from './define-customer-discount/define-customer-discount.page';
import { DirectivesModule } from '@app_directives/directives.module';
import { EditCustomerDiscountDialog } from './edit-customer-discount-dialog/edit-customer-discount.dialog';
import { AppMaterialModule } from '@appapp-material.module';

@NgModule({
  declarations: [
    FilterCustomerDiscountPage,
    DefineCustomerDiscountPage,
    DefineCustomerDiscountDialog,
    EditCustomerDiscountDialog
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    CustomerDiscountRoutingModule,
    ComponentsModule,
    AppMaterialModule,
    FormsModule,
    DirectivesModule,
    NgPersianDatepickerModule
  ],
  exports: [FilterCustomerDiscountPage],
  schemas: [],
  providers: [CustomerDiscountService]
})
export class CustomerDiscountModule { }
