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
import { AuthService } from '../../_services/auth/auth.service';
import { AccessDeniedPage } from './accessDenied/access-denied.page';
import { TokenStoreService } from '../../_services/auth/token-store.service';
import { RefreshTokenService } from '../../_services/auth/refresh-token.service';
import { BrowserStorageService } from '../../_services/auth/browser-storage.service';

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
        TokenStoreService,
        RefreshTokenService,
        BrowserStorageService
    ]
})
export class AuthModule { }
