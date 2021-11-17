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
import { FilterProductComponent } from './filter-product/filter-product.component';
import { CreateProductComponent } from './create-product/create-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatRadioModule} from '@angular/material/radio'; 

@NgModule({
  declarations: [
    FilterProductComponent,
    CreateProductComponent,
    EditProductComponent
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
    MatDialogModule,
    MatRadioModule,
    MatButtonModule,
    MatSelectModule,
    ToastrModule.forRoot()
  ],
  exports: [
    FilterProductComponent,
    CreateProductComponent,
    EditProductComponent
  ],
  schemas: []
})
export class ProductModule { }
