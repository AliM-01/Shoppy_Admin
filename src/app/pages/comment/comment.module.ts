import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from '@app_components/components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DirectivesModule } from '@app_directives/directives.module';
import { PipesModule } from '@app_pipes/pipes.module';
import { AppMaterialModule } from '@appapp-material.module';
import { CommentService } from '@app_services/comment/comment.service';
import { CommentRoutingModule } from './comment.routing.module';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    CommentRoutingModule,
    ComponentsModule,
    FormsModule,
    AppMaterialModule,
    DirectivesModule,
    PipesModule
  ],
  exports: [],
  schemas: [],
  providers: [CommentService]
})
export class CommentModule { }
