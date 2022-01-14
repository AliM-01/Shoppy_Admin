import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from '@app_components/components.module';
import { ProductRoutingModule } from './product.routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FilterProductPage } from './filter-product/filter-product.page';
import { CreateProductDialog } from './create-product/create-product.dialog';
import { EditProductDialog } from './edit-product/edit-product.dialog';
import { ProductPicturePage } from './product-picture/product-picture.page';
import { ProductService } from '@app_services/shop/product/product.service';
import { DirectivesModule } from '@app_directives/directives.module';
import { ProductCategoryService } from '@app_services/shop/product-category/product-category.service';
import { AppMaterialModule } from '@appapp-material.module';

@NgModule({
  declarations: [
    FilterProductPage,
    CreateProductDialog,
    EditProductDialog,
    ProductPicturePage
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    ProductRoutingModule,
    AppMaterialModule,
    ComponentsModule,
    DirectivesModule
  ],
  exports: [
    FilterProductPage,
    CreateProductDialog,
    EditProductDialog,
    ProductPicturePage
  ],
  schemas: [],
  providers: [
    ProductService,
    ProductCategoryService
  ]
})
export class ProductModule { }
