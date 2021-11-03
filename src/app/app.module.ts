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
import { IndexComponent } from './pages/index/index.component';
import { ChartsModule } from 'ng2-charts';
import { LineChartComponent } from './pages/index/line-chart/line-chart.component';
import { BarChartComponent } from './pages/index/bar-chart/bar-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    FilterProductCategoryComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    PreloaderComponent,
    IndexComponent,
    LineChartComponent,
    BarChartComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    ChartsModule
  ],
  providers: [ProductCategoryService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
