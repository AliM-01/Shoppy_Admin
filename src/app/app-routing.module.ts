import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './pages/index/index.component';

const routes: Routes = [
  { path: '', component: IndexComponent },
  {
    path: 'product-category',
    loadChildren: () => import('./pages/shop/product-category/product.category.module').then(m => m.ProductCategoryModule)
  },
  {
    path: 'product',
    loadChildren: () => import('./pages/shop/product/product.module').then(m => m.ProductModule)
  },
  {
    path: 'slider',
    loadChildren: () => import('./pages/shop/slider/slider.module').then(m => m.SliderModule)
  },
  {
    path: 'customer-discount',
    loadChildren: () => import('./pages/discount/customer-discount/customer.discount.module').then(m => m.CustomerDiscountModule)
  },
  {
    path: 'colleague-discount',
    loadChildren: () => import('./pages/discount/colleague-discount/colleague.discount.module').then(m => m.ColleagueDiscountModule)
  },
  {
    path: 'inventory',
    loadChildren: () => import('./pages/inventory/inventory.module').then(m => m.InventoryModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
