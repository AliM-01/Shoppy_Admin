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
import { FilterCustomerDiscountComponent } from './filter-customer-discount/filter-customer-discount.component';
import { NgPersianDatepickerModule } from 'ng-persian-datepicker';
import { DefineCustomerDiscountComponentDialog } from './define-customer-discount-dialog/define-customer-discount.dialog.component';
import { DefineCustomerDiscountComponent } from './define-customer-discount/define-customer-discount.component';
import { DirectivesModule } from '@app_directives/directives.module';
import { EditCustomerDiscountComponentDialog } from './edit-customer-discount-dialog/edit-customer-discount.dialog.component';

@NgModule({
  declarations: [
    FilterCustomerDiscountComponent,
    DefineCustomerDiscountComponent,
    DefineCustomerDiscountComponentDialog,
    EditCustomerDiscountComponentDialog
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
  exports: [FilterCustomerDiscountComponent],
  schemas: [],
  providers: [CustomerDiscountService]
})
export class CustomerDiscountModule { }
