import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from '@app_components/components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DirectivesModule } from '@app_directives/directives.module';
import { PipesModule } from '@app_pipes/pipes.module';
import { AppMaterialModule } from '@appapp-material.module';
import { LoginPage } from './login/login.page';
import { AuthRoutingModule } from './auth.routing.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '@app_http/auth.interceptor';
import { AuthService } from '../../_services/auth/auth.service';
import { AccessDeniedPage } from './accessDenied/access-denied.page';

@NgModule({
    declarations: [
        LoginPage,
        AccessDeniedPage
    ],
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        AuthRoutingModule,
        ComponentsModule,
        FormsModule,
        AppMaterialModule,
        DirectivesModule,
        PipesModule
    ],
    exports: [LoginPage, AccessDeniedPage],
    schemas: [],
    providers: [
        AuthService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        }
    ]
})
export class AuthModule { }
