import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { IndexModule } from '@app/pages/index/index.module';
import { ComponentsModule } from '@app_components/components.module';
import { CkeditorService } from '@app_services/common/ckeditor/ckeditor.service';
import { ToastrModule } from 'ngx-toastr';
import { DataHelperService } from '@app_services/common/data-helper/data-helper.service';
import { LoadingService } from './_services/common/loading/loading.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ComponentsModule,
    IndexModule,
    ToastrModule.forRoot({
      tapToDismiss: false,
      autoDismiss: true
    }),
  ],
  providers: [
    CkeditorService,
    DataHelperService,
    LoadingService
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
