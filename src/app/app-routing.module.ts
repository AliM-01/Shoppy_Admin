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
    path: 'product-feature',
    loadChildren: () => import('./pages/shop/product-feature/product.feature.module').then(m => m.ProductFeatureModule)
  },
  {
    path: 'slider',
    loadChildren: () => import('./pages/shop/slider/slider.module').then(m => m.SliderModule)
  },
  {
    path: 'product-discount',
    loadChildren: () => import('./pages/discount/product-discount/product.discount.module').then(m => m.ProductDiscountModule)
  },
  {
    path: 'colleague-discount',
    loadChildren: () => import('./pages/discount/colleague-discount/colleague.discount.module').then(m => m.ColleagueDiscountModule)
  },
  {
    path: 'inventory',
    loadChildren: () => import('./pages/inventory/inventory.module').then(m => m.InventoryModule)
  },
  {
    path: 'comment',
    loadChildren: () => import('./pages/comment/comment.module').then(m => m.CommentModule)
  },
  {
    path: 'article-category',
    loadChildren: () => import('./pages/blog/article-category/article.category.module').then(m => m.ArticleCategoryModule)
  },
  {
    path: 'article',
    loadChildren: () => import('./pages/blog/article/article.module').then(m => m.ArticleModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
