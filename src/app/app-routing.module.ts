import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthLayoutComponent} from '@applayouts/auth/auth.layout.component';
import {DashboardLayoutComponent} from '@applayouts/dashboard/dashboard.layout.component';
import {IndexComponent} from './pages/dashboard/index/index.component';
import {AuthGuard} from '@app_http/auth.guard';
import {NotFoundPage} from '@app/pages/common/not-found/not-found.page';

const routes: Routes = [
  {
    path: '',
    component: DashboardLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {path: '', component: IndexComponent, pathMatch: 'full'},
      {
        path: 'account',
        loadChildren: () => import('./pages/dashboard/account/account.module').then(m => m.AccountModule)
      },
      {
        path: 'product-category',
        loadChildren: () => import('./pages/dashboard/shop/product-category/product.category.module').then(m => m.ProductCategoryModule)
      },
      {
        path: 'product',
        loadChildren: () => import('./pages/dashboard/shop/product/product.module').then(m => m.ProductModule)
      },
      {
        path: 'product-feature',
        loadChildren: () => import('./pages/dashboard/shop/product-feature/product.feature.module').then(m => m.ProductFeatureModule)
      },
      {
        path: 'slider',
        loadChildren: () => import('./pages/dashboard/shop/slider/slider.module').then(m => m.SliderModule)
      },
      {
        path: 'product-discount',
        loadChildren: () => import('./pages/dashboard/discount/product-discount/product.discount.module').then(m => m.ProductDiscountModule)
      },
      {
        path: 'discount-code',
        loadChildren: () => import('./pages/dashboard/discount/discount-code/discount.code.module').then(m => m.DiscountCodeModule)
      },
      {
        path: 'inventory',
        loadChildren: () => import('./pages/dashboard/inventory/inventory.module').then(m => m.InventoryModule)
      },
      {
        path: 'order',
        loadChildren: () => import('./pages/dashboard/order/order.module').then(m => m.OrderModule)
      },
      {
        path: 'comment',
        loadChildren: () => import('./pages/dashboard/comment/comment.module').then(m => m.CommentModule)
      },
      {
        path: 'article-category',
        loadChildren: () => import('./pages/dashboard/blog/article-category/article.category.module').then(m => m.ArticleCategoryModule)
      },
      {
        path: 'article',
        loadChildren: () => import('./pages/dashboard/blog/article/article.module').then(m => m.ArticleModule)
      }
    ]
  },

  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'auth',
        loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule)
      }
    ]
   },

  {path: 'not-found', component: NotFoundPage},
  {path: '**', redirectTo: '/not-found'},

  {path: 'login', redirectTo: '/auth/login'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
