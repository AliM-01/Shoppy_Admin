import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLayoutComponent } from '@applayouts/auth/auth.layout.component';
import { DashboardLayoutComponent } from '@applayouts/dashboard/dashboard.layout.component';
import { IndexComponent } from './pages/index/index.component';
import { AuthGuard } from '@app_http/auth.guard';
import { AuthGuardPermission } from '@app_models/auth/auth-guard-permission';
import { NotFoundPage } from '@apppages/not-found/not-found.page';

const routes: Routes = [
  {
    path: '',
    component: DashboardLayoutComponent,
    data: {
      permission: {
        permittedRoles: ["Admin"]
      } as AuthGuardPermission
    },
    canActivate: [AuthGuard],
    children: [     
      { path: '', component: IndexComponent, pathMatch: 'full'},
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
    ]
  },
  
  { 
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'auth',
        loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule)
      },
    ]
   },

  { path: 'not-found', component: NotFoundPage},
  { path: '**', redirectTo: '/not-found' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
