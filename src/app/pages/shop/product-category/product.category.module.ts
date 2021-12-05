import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from '@app_components/components.module';
import { CreateProductCategoryComponent } from './create-product-category/create-product-category.component';
import { FilterProductCategoryComponent } from './filter-product-category/filter-product-category.component';
import { ProductCategoryRoutingModule } from './product.category.routing.module';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button'; 
import { ToastrModule } from 'ngx-toastr';
import { EditProductCategoryComponent } from './edit-product-category/edit-product-category.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'; 
import { ProductCategoryService } from '@app_services/shop/product-category/product-category.service';
import { DirectivesModule } from '@app_directives/directives.module';

@NgModule({
  declarations: [
    FilterProductCategoryComponent,
    CreateProductCategoryComponent,
    EditProductCategoryComponent
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
    MatDialogModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    ToastrModule.forRoot(),
    DirectivesModule
  ],
  exports: [
    FilterProductCategoryComponent,
    CreateProductCategoryComponent
  ],
  schemas: [],
  providers: [ProductCategoryService]
})
export class ProductCategoryModule { }
