import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from '@app_components/components.module';
import { CreateProductCategoryDialog } from './create-product-category/create-product-category.dialog';
import { FilterProductCategoryPage } from './filter-product-category/filter-product-category.page';
import { ProductCategoryRoutingModule } from './product.category.routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { EditProductCategoryDialog } from './edit-product-category/edit-product-category.dialog';
import { ProductCategoryService } from '@app_services/shop/product-category/product-category.service';
import { DirectivesModule } from '@app_directives/directives.module';
import { AppMaterialModule } from '@appapp-material.module';

@NgModule({
  declarations: [
    FilterProductCategoryPage,
    CreateProductCategoryDialog,
    EditProductCategoryDialog
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    AppMaterialModule,
    ProductCategoryRoutingModule,
    ComponentsModule,
    DirectivesModule
  ],
  exports: [
    FilterProductCategoryPage,
    CreateProductCategoryDialog
  ],
  schemas: [],
  providers: [ProductCategoryService]
})
export class ProductCategoryModule { }
