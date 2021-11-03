import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FilterProductCategoryComponent } from '@apppages/product-category/filter-product-category/filter-product-category.component';
import { IndexComponent } from './pages/index/index.component';

const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'product-category', component: FilterProductCategoryComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
