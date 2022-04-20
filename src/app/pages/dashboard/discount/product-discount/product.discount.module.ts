import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ComponentsModule} from '@app_components/components.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ProductDiscountService} from '@app_services/discount/product-discount/product-discount.service';
import {ProductDiscountRoutingModule} from './product.discount.routing.module';
import {FilterProductDiscountPage} from './filter-product-discount/filter-product-discount.page';
import {NgPersianDatepickerModule} from 'ng-persian-datepicker';
import {DefineProductDiscountDialog} from './define-product-discount-dialog/define-product-discount.dialog';
import {DefineProductDiscountPage} from './define-product-discount/define-product-discount.page';
import {DirectivesModule} from '@app_directives/directives.module';
import {EditProductDiscountDialog} from './edit-product-discount-dialog/edit-product-discount.dialog';
import {AppMaterialModule} from '@appapp-material.module';

@NgModule({
  declarations: [
    FilterProductDiscountPage,
    DefineProductDiscountPage,
    DefineProductDiscountDialog,
    EditProductDiscountDialog
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    ProductDiscountRoutingModule,
    ComponentsModule,
    AppMaterialModule,
    FormsModule,
    DirectivesModule,
    NgPersianDatepickerModule
  ],
  exports: [FilterProductDiscountPage],
  schemas: [],
  providers: [ProductDiscountService]
})
export class ProductDiscountModule { }
