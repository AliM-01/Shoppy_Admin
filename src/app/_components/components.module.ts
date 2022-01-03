import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { LoadingComponent } from './loading/loading.component';
import { NgxLoadingModule } from 'ngx-loading';

@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    BreadcrumbComponent,
    LoadingComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    CKEditorModule,
    NgxLoadingModule.forRoot({
      fullScreenBackdrop: true
    })
  ],
  exports: [
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    BreadcrumbComponent,
    LoadingComponent
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ]
})
export class ComponentsModule { }
