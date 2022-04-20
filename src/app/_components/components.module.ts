import {CommonModule} from '@angular/common';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {RouterModule} from '@angular/router';
import {FooterComponent} from './footer/footer.component';
import {HeaderComponent} from './header/header.component';
import {SidebarComponent} from './sidebar/sidebar.component';
import {CKEditorModule} from '@ckeditor/ckeditor5-angular';
import {BreadcrumbComponent} from './breadcrumb/breadcrumb.component';
import {LoadingComponent} from './loading/loading.component';
import {NgxLoadingModule} from 'ngx-loading';
import {ConfirmDialog} from './confirm-dialog/confirm.dialog';
import {AppMaterialModule} from '../app-material.module';

@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    BreadcrumbComponent,
    LoadingComponent,
    ConfirmDialog
  ],
  imports: [
    CommonModule,
    RouterModule,
    CKEditorModule,
    AppMaterialModule,
    NgxLoadingModule.forRoot({
      fullScreenBackdrop: true,
      primaryColour: '#57edbbe6',
      secondaryColour: '#17e9a3e5',
      tertiaryColour: '#57edbbe6',
      backdropBackgroundColour: '#fff'
    })
  ],
  exports: [
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    BreadcrumbComponent,
    LoadingComponent,
    ConfirmDialog
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ]
})
export class ComponentsModule { }
