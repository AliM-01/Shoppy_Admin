import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from '@app_components/components.module';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button'; 
import { ToastrModule } from 'ngx-toastr';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'; 
import { CustomerDiscountService } from '@app_services/discount/customer-discount/customer-discount.service';
import { CustomerDiscountRoutingModule } from './customer.discount.routing.module';
import { FilterCustomerDiscountComponent } from './filter-customer-discount/filter-customer-discount.component';
import { DefineCustomerDiscountComponent } from './create-customer-discount/define-customer-discount.component';

@NgModule({
  declarations: [
    FilterCustomerDiscountComponent,
    DefineCustomerDiscountComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    CustomerDiscountRoutingModule,
    ComponentsModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    ToastrModule.forRoot()
  ],
  exports: [FilterCustomerDiscountComponent],
  schemas: [],
  providers: [CustomerDiscountService]
})
export class CustomerDiscountModule { }
