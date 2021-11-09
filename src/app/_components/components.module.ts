import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { PreloaderComponent } from './preloader/preloader.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { CkeditorComponent } from './ckeditor/ckeditor.component';

@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    PreloaderComponent,
    CkeditorComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    CKEditorModule
  ],
  exports: [
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    PreloaderComponent,
    CkeditorComponent
  ],
  schemas: []
})
export class ComponentsModule { }
