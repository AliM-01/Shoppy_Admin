import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from '@app_components/components.module';
import { FilterProductCategoryComponent } from './filter-product-category/filter-product-category.component';
import { ProductCategoryRoutingModule } from './product.category.routing.module';

@NgModule({
  declarations: [
    FilterProductCategoryComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ProductCategoryRoutingModule,
    ComponentsModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule
  ],
  exports: [
    FilterProductCategoryComponent
  ],
  schemas: []
})
export class ProductCategoryModule { }
