import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FilterProductCategoryComponent } from './pages/product-category/filter-product-category/filter-product-category.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSortModule} from '@angular/material/sort';
import { ProductCategoryService } from './_services/product-category/product-category.service';
import { HeaderComponent } from '@app_components/header/header.component';
import { SidebarComponent } from '@app_components/sidebar/sidebar.component';
import { FooterComponent } from './_components/footer/footer.component';
import { PreloaderComponent } from './_components/preloader/preloader.component';
import { IndexModule } from '@apppages/index/index.module';

@NgModule({
  declarations: [
    AppComponent,
    FilterProductCategoryComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    PreloaderComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    IndexModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule
  ],
  providers: [ProductCategoryService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
