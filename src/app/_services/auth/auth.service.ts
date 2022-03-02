import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable, throwError } from "rxjs";
import { catchError, finalize, map, tap } from "rxjs/operators";
import { TokenStoreService } from "./token-store.service";
import { RefreshTokenService } from './refresh-token.service';
import { environment } from "@environments/environment";
import { LoginRequestModel } from '../../_models/auth/login-request';
import { AuthTokenType } from "@app_models/auth/auth-token-type";
import { AuthUser } from "@app_models/auth/auth-user";
import { ToastrService } from "ngx-toastr";
import { LoadingService } from "@app_services/_common/loading/loading.service";
import { RevokeRefreshTokenRequestModel } from '../../_models/auth/revoke-refresh-token-request';
import { IResponse } from "@app_models/_common/IResponse";
import { LoginResponseModel } from "@app_models/auth/login-response";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authStatusSource = new BehaviorSubject<boolean>(false);
  authStatus$ = this.authStatusSource.asObservable();

  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private loading: LoadingService,
    private router: Router,
    private tokenStoreService: TokenStoreService,
    private refreshTokenService: RefreshTokenService
  ) {
    this.updateStatusOnPageRefresh();
    this.refreshTokenService.scheduleRefreshToken(this.isAuthUserLoggedIn(), false);
  }

  login(loginData: LoginRequestModel): Observable<boolean> {
    console.log('login service loginData', loginData);

    this.loading.loadingOn();

    const formData = new FormData();
    formData.append('email', loginData.email);
    formData.append('password', loginData.password);
    console.log('login service formData', formData);

    return this.http
      .post<IResponse<LoginResponseModel>>(`${environment.authBaseApiUrl}/login`, formData)
      .pipe(
        map((res) => {
          if (res.status === 'success') {
            console.log('login service res', res);

            this.tokenStoreService.storeLoginSession(res.data);
            console.log("Logged-in user info", this.getAuthUser());
            this.refreshTokenService.scheduleRefreshToken(true, true);
            this.authStatusSource.next(true);
            return true;
          }
          this.loading.loadingOff();

          return false;
        }),
        catchError((error: HttpErrorResponse) => {

          this.toastr.error(error.error.message, 'خطا', { timeOut: 2500 });
          this.loading.loadingOff();
          this.authStatusSource.next(false);
          this.loading.loadingOff();
          this.toastr.error("عملیات با خطا مواجه شد", 'خطا', { timeOut: 2500 });

          return throwError(error);
        })
      );
  }

  getBearerAuthHeader(): HttpHeaders {
    return new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": `Bearer ${this.tokenStoreService.getRawAuthToken(AuthTokenType.AccessToken)}`
    });
  }

  logout(navigateToHome: boolean): void {
    this.loading.loadingOn();

    const refreshToken = encodeURIComponent(this.tokenStoreService.getRawAuthToken(AuthTokenType.RefreshToken));

    const logoutData = new RevokeRefreshTokenRequestModel(refreshToken);

    this.http
      .post<IResponse<string>>(`${environment.authBaseApiUrl}/logout`, logoutData)
      .pipe(
        tap(() => this.loading.loadingOff()),
        catchError((error: HttpErrorResponse) => {

          this.toastr.error(error.error.message, 'خطا', { timeOut: 2500 });
          this.loading.loadingOff();

          return throwError(error);
        }),
        finalize(() => {
          this.tokenStoreService.deleteAuthTokens();
          this.refreshTokenService.unscheduleRefreshToken(true);
          this.authStatusSource.next(false);
          if (navigateToHome) {
            this.router.navigate(["/"]);
          }
        }))
      .subscribe(result => {
        console.log("logout", result);
      });
  }

  isAuthUserLoggedIn(): boolean {
    const tokenIsSaved: boolean = this.tokenStoreService.hasStoredAccessAndRefreshTokens() &&
      !this.tokenStoreService.isAccessTokenTokenExpired();

    if (!tokenIsSaved)
      return false;

    this.http
      .get<IResponse<string>>(`${environment.authBaseApiUrl}/is-authenticated`)
      .pipe(
        catchError((error: HttpErrorResponse) => {

          this.toastr.error(error.error.message, 'خطا', { timeOut: 2500 });
          this.loading.loadingOff();

          return throwError(error);
        }))
      .subscribe(result => {
        if(result.status === 'success'){
          return true;
        }
        return false;
      });

    return false;
  }

  getAuthUser(): AuthUser | null {
    if (!this.isAuthUserLoggedIn()) {
      return null;
    }

    const decodedToken = this.tokenStoreService.getDecodedAccessToken();
    const roles = this.tokenStoreService.getDecodedTokenRoles();
    return new AuthUser(
      decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"],
      decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"],
      decodedToken["DisplayName"],
      roles
    );
  }

  isAuthUserInRoles(requiredRoles: string[]): boolean {
    const user = this.getAuthUser();
    if (!user || !user.roles) {
      return false;
    }

    if (user.roles.indexOf("Admin") >= 0) {
      return true;
    }

    return requiredRoles.some(requiredRole => {
      if (user.roles) {
        return user.roles.indexOf(requiredRole.toLowerCase()) >= 0;
      } else {
        return false;
      }
    });
  }

  isAuthUserInRole(requiredRole: string): boolean {
    return this.isAuthUserInRoles([requiredRole]);
  }

  private updateStatusOnPageRefresh(): void {
    this.authStatusSource.next(this.isAuthUserLoggedIn());
  }
}
