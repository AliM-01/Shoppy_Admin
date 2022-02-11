import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from '@app_components/components.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DirectivesModule } from '@app_directives/directives.module';
import { AppMaterialModule } from '@appapp-material.module';
import { ArticleRoutingModule } from './article.routing.module';
import { ArticleService } from '@app_services/blog/article/article.service';
import { FilterArticlePage } from './filter-article/filter-article.page';

@NgModule({
  declarations: [
    FilterArticlePage
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    AppMaterialModule,
    ArticleRoutingModule,
    ComponentsModule,
    DirectivesModule
  ],
  exports: [
    FilterArticlePage
  ],
  schemas: [],
  providers: [ArticleService]
})
export class ArticleModule { }
