import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from '@app_components/components.module';
import { CreateProductCategoryDialog } from './create-product-category/create-product-category.dialog';
import { FilterProductCategoryPage } from './filter-product-category/filter-product-category.page';
import { ProductCategoryRoutingModule } from './product.category.routing.module';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button'; 
import { EditProductCategoryDialog } from './edit-product-category/edit-product-category.dialog';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'; 
import { ProductCategoryService } from '@app_services/shop/product-category/product-category.service';
import { DirectivesModule } from '@app_directives/directives.module';
import { MatSortModule } from '@angular/material/sort';

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
    ProductCategoryRoutingModule,
    ComponentsModule,
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
  exports: [
    FilterProductCategoryPage,
    CreateProductCategoryDialog
  ],
  schemas: [],
  providers: [ProductCategoryService]
})
export class ProductCategoryModule { }
