import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from '@app_components/components.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DirectivesModule } from '@app_directives/directives.module';
import { AppMaterialModule } from '@appapp-material.module';
import { ArticleCategoryRoutingModule } from './article.category.routing.module';
import { ArticleCategoryService } from '@app_services/blog/article-category/article-category.service';
import { FilterArticleCategoryPage } from './filter-article-category/filter-article-category.page';
import { CreateArticleCategoryDialog } from './create-article-category/create-article-category.dialog';

@NgModule({
  declarations: [
    FilterArticleCategoryPage,
    CreateArticleCategoryDialog
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    AppMaterialModule,
    ArticleCategoryRoutingModule,
    ComponentsModule,
    DirectivesModule
  ],
  exports: [
    FilterArticleCategoryPage
  ],
  schemas: [],
  providers: [ArticleCategoryService]
})
export class ArticleCategoryModule { }
