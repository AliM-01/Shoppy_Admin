import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FilterProductCategoryComponent } from '@apppages/product-category/filter-product-category/filter-product-category.component';

const routes: Routes = [
  { path: '', component: FilterProductCategoryComponent },
  { path: 't', component: FilterProductCategoryComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
