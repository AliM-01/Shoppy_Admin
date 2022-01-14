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
import { LoadingService } from '@loading';
import { AppMaterialModule } from '@app_material';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AppMaterialModule,
    ComponentsModule,
    IndexModule,
    ToastrModule.forRoot({
      tapToDismiss: false,
      autoDismiss: true
    }),
  ],
  providers: [
    CkeditorService,
    LoadingService
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
