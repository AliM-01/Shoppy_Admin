import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ComponentsModule} from '@app_components/components.module';
import {CkeditorService} from '@app_services/_common/ckeditor/ckeditor.service';
import {ToastrModule} from 'ngx-toastr';
import {LoadingService} from '@loading-service';
import {AppMaterialModule} from '@app_material';
import {DashboardLayoutComponent} from '@app/layouts/dashboard/dashboard.layout.component';
import {AuthLayoutComponent} from '@app/layouts/auth/auth.layout.component';
import {IndexModule} from '@app/pages/dashboard/index/index.module';
import {AuthInterceptor} from '@app_http/auth.interceptor';
import {AuthModule} from '@app/pages/auth/auth.module';
import {CookieService} from '@app_services/_common/cookie/cookie.service';
import {AuthService} from './_services/auth/auth.service';

@NgModule({
  declarations: [
    AppComponent,
    DashboardLayoutComponent,
    AuthLayoutComponent
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
    AuthModule,
    ToastrModule.forRoot({
      tapToDismiss: false,
      autoDismiss: true
    })
  ],
  exports: [
    DashboardLayoutComponent,
    AuthLayoutComponent
  ],
  providers: [
    CookieService,
    CkeditorService,
    AuthService,
    LoadingService,
    {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi: true
    }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
