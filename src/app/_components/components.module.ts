import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { PreloaderComponent } from './preloader/preloader.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoadingComponent } from './loading/loading.component';

@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    PreloaderComponent,
    BreadcrumbComponent,
    LoadingComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    CKEditorModule,
    MatProgressSpinnerModule
  ],
  exports: [
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    PreloaderComponent,
    BreadcrumbComponent,
    LoadingComponent
  ],
  schemas: []
})
export class ComponentsModule { }
