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
import { ToastrModule } from 'ngx-toastr';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'; 
import { CustomerDiscountService } from '@app_services/discount/customer-discount/customer-discount.service';
import { CustomerDiscountRoutingModule } from './customer.discount.routing.module';
import { FilterCustomerDiscountPage } from './filter-customer-discount/filter-customer-discount.page';
import { NgPersianDatepickerModule } from 'ng-persian-datepicker';
import { DefineCustomerDiscountDialog } from './define-customer-discount-dialog/define-customer-discount.dialog';
import { DefineCustomerDiscountPage } from './define-customer-discount/define-customer-discount.page';
import { DirectivesModule } from '@app_directives/directives.module';
import { EditCustomerDiscountDialog } from './edit-customer-discount-dialog/edit-customer-discount.dialog';

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
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    DirectivesModule,
    NgPersianDatepickerModule
  ],
  exports: [FilterCustomerDiscountPage],
  schemas: [],
  providers: [CustomerDiscountService]
})
export class CustomerDiscountModule { }
