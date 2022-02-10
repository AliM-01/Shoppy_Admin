import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from '@app_components/components.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DirectivesModule } from '@app_directives/directives.module';
import { AppMaterialModule } from '@appapp-material.module';
import { ArticleRoutingModule } from './article.routing.module';
import { ArticleService } from '@app_services/blog/article/article.service';

@NgModule({
  declarations: [
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
  ],
  schemas: [],
  providers: [ArticleService]
})
export class ArticleModule { }
