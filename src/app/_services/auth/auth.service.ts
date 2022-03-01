import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable, throwError } from "rxjs";
import { catchError, finalize, map } from "rxjs/operators";
import { TokenStoreService } from "./token-store.service";
import { RefreshTokenService } from './refresh-token.service';
import { environment } from "@environments/environment";
import { LoginRequestModel } from '../../_models/auth/login-request';
import { AuthTokenType } from "@app_models/auth/auth-token-type";
import { AuthUser } from "@app_models/auth/auth-user";
import { ToastrService } from "ngx-toastr";
import { LoadingService } from "@app_services/_common/loading/loading.service";

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
    this.loading.loadingOn();

    const formData = new FormData();
    formData.append('email', loginData.email);
    formData.append('password', loginData.password);

    return this.http
      .post(`${environment.authBaseApiUrl}/login`, formData)
      .pipe(
        map((response: any) => {
          this.tokenStoreService.setRememberMe(loginData.rememberMe);
          if (!response) {
            this.authStatusSource.next(false);
            this.loading.loadingOff();
            this.toastr.error("عملیات با خطا مواجه شد", 'خطا', { timeOut: 2500 });
            return false;
          }
          this.tokenStoreService.storeLoginSession(response);
          console.log("Logged-in user info", this.getAuthUser());
          this.refreshTokenService.scheduleRefreshToken(true, true);
          this.authStatusSource.next(true);

          this.loading.loadingOff();
          return true;
        }),
        catchError((error: HttpErrorResponse) => {

          this.toastr.error(error.error.message, 'خطا', { timeOut: 2500 });
          this.loading.loadingOff();

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

    const headers = new HttpHeaders({ "Content-Type": "application/json" });
    const refreshToken = encodeURIComponent(this.tokenStoreService.getRawAuthToken(AuthTokenType.RefreshToken));
    this.http
      .get(`${environment.authBaseApiUrl}/logout?refreshToken=${refreshToken}`,
        { headers: headers })
      .pipe(
        map(response => response || {}),
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
    return this.tokenStoreService.hasStoredAccessAndRefreshTokens() &&
      !this.tokenStoreService.isAccessTokenTokenExpired();
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
