import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
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
import { of } from "rxjs";
import { AccountModel } from '../../_models/account/account';

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
    this.isAuthUserLoggedIn()
      .subscribe(res => {
        if (res) {
          this.refreshTokenService.scheduleRefreshToken(true, false);
        }
      })
  }

  login(loginData: LoginRequestModel): Observable<boolean> {

    this.loading.loadingOn();

    const formData = new FormData();
    formData.append('email', loginData.email);
    formData.append('password', loginData.password);

    return this.http
      .post<IResponse<LoginResponseModel>>(`${environment.authBaseApiUrl}/login`, formData)
      .pipe(
        map((res) => {
          if (res.status === 'success') {

            this.loading.loadingOff();
            this.tokenStoreService.storeLoginSession(res.data);
            this.refreshTokenService.scheduleRefreshToken(true, true);
            this.authStatusSource.next(true);
            return true;
          }

          return false;
        }),
        tap(() => this.loading.loadingOff()),
        catchError((error: HttpErrorResponse) => {

          this.toastr.error(error.error.message, 'خطا', { timeOut: 2500 });
          this.authStatusSource.next(false);
          this.toastr.error("عملیات با خطا مواجه شد", 'خطا', { timeOut: 2500 });

          this.loading.loadingOff();
          return throwError(error);
        })
      );
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
            this.router.navigate(["/auth/login"]);
          }
        }))
      .subscribe(result => {
        console.log("logout", result);
      });
  }

  isAuthUserLoggedIn(): Observable<boolean> {

    if (!this.tokenStoreService.hasStoredAccessAndRefreshTokens()) {
      return of(false)
    }

    let params = new HttpParams()
      .set('roles', 'Admin');

    return this.http
      .get<IResponse<string>>(`${environment.authBaseApiUrl}/is-in-role`, { params })
      .pipe(
        map(res => {
          if (res.status === 'success') {
            return true;
          } else {
            return false;
          }
        }),
        catchError((error: HttpErrorResponse) => {

          this.toastr.error(error.error.message, 'خطا', { timeOut: 2500 });
          this.loading.loadingOff();

          return of(false);
        }));
  }

  getCurrentUser(): Observable<IResponse<AccountModel>> {

    return this.http
      .get<IResponse<AccountModel>>(`${environment.authBaseApiUrl}/get-currentUser`)
      .pipe(
        tap(() => this.loading.loadingOff()),
        catchError((error: HttpErrorResponse) => {

          this.toastr.error(error.error.message, 'خطا', { timeOut: 2500 });
          this.loading.loadingOff();

          return throwError(false);
        }));
  }

  private updateStatusOnPageRefresh(): void {
    this.isAuthUserLoggedIn()
      .subscribe(res => this.authStatusSource.next(res) )
  }
}
