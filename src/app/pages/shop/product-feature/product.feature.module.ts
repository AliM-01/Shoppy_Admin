import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from '@app_components/components.module';
import { ProductFeatureRoutingModule } from './product.feature.routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DirectivesModule } from '@app_directives/directives.module';
import { AppMaterialModule } from '@appapp-material.module';
import { ProductFeatureService } from '@app_services/shop/product-feature/product-feature.service';
import { FilterProductFeaturePage } from './filter-product-feature/filter-product-feature.page';
import { CreateProductFeatureDialog } from './create-product-feature/create-product-feature.dialog';
import { EditProductFeatureDialog } from './edit-product-feature/edit-product-feature.dialog';

@NgModule({
  declarations: [
    FilterProductFeaturePage,
    CreateProductFeatureDialog,
    EditProductFeatureDialog
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    AppMaterialModule,
    ProductFeatureRoutingModule,
    ComponentsModule,
    DirectivesModule
  ],
  exports: [
  ],
  schemas: [],
  providers: [ProductFeatureService]
})
export class ProductFeatureModule { }
