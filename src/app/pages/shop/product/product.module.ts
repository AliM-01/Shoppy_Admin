import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from '@app_components/components.module';
import { ProductRoutingModule } from './product.routing.module';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select'; 
import { ToastrModule } from 'ngx-toastr';
import { FilterProductPage } from './filter-product/filter-product.page';
import { CreateProductDialog } from './create-product/create-product.dialog';
import { EditProductDialog } from './edit-product/edit-product.dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatRadioModule} from '@angular/material/radio'; 
import { ProductPicturePage } from './product-picture/product-picture.page';
import { ProductService } from '@app_services/shop/product/product.service';
import { DirectivesModule } from '@app_directives/directives.module';
import { ProductCategoryService } from '@app_services/shop/product-category/product-category.service';
import { MatSortModule } from '@angular/material/sort';

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
    ComponentsModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatRadioModule,
    MatButtonModule,
    MatSelectModule,
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
