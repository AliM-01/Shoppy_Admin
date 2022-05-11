import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {BehaviorSubject, Observable, throwError, of} from "rxjs";
import {catchError, finalize, map} from "rxjs/operators";
import {environment} from "@app_env";
import {TokenStoreService, RefreshTokenService} from "./_index";
import {ToastrService} from "ngx-toastr";
import {LoadingService} from "@loading-service";
import {AuthTokenType, LoginRequestModel, LoginResponseModel, RevokeRefreshTokenRequestModel} from '@app_models/auth/_index';
import {IResponse} from "@app_models/_common/IResponse";
import {AccountModel} from '@app_models/account/account';

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

    return this.http.post<LoginResponseModel>(`${environment.authBaseApiUrl}/login`, formData)
      .pipe(
        map((res) => {
          this.loading.loadingOff();
          this.tokenStoreService.storeLoginSession(res);
          this.refreshTokenService.scheduleRefreshToken(true, true);
          this.authStatusSource.next(true);
          return true;
        }),
        catchError((error: HttpErrorResponse) => {

          this.toastr.error(error.error.message, 'خطا', {timeOut: 2500});
          this.authStatusSource.next(false);
          this.toastr.error("عملیات با خطا مواجه شد", 'خطا', {timeOut: 2500});

          this.loading.loadingOff();
          return throwError(error);
        })
      );
  }

  logout(navigateToHome: boolean): void {
    this.loading.loadingOn();

    const refreshToken = encodeURIComponent(this.tokenStoreService.getRawAuthToken(AuthTokenType.RefreshToken));

    const logoutData = new RevokeRefreshTokenRequestModel(refreshToken);

    this.http.post<IResponse>(`${environment.authBaseApiUrl}/logout`, logoutData)
      .pipe(
        finalize(() => {
          this.loading.loadingOff()
          this.tokenStoreService.deleteAuthTokens();
          this.refreshTokenService.unscheduleRefreshToken(true);
          this.authStatusSource.next(false);
          if (navigateToHome) {
            this.router.navigate(["/auth/login"]);
          }
        }),
        catchError((error: HttpErrorResponse) => {
          this.toastr.error(error.error.message, 'خطا', {timeOut: 2500});
          return throwError(error);
        })
      );
  }

  isAuthUserLoggedIn(): Observable<boolean> {

    if (!this.tokenStoreService.hasStoredAccessAndRefreshTokens()) {
      return of(false)
    }

    const params = new HttpParams()
      .set('roles', 'Admin');

    return this.http.get<IResponse>(`${environment.authBaseApiUrl}/is-in-role`, {params})
      .pipe(
        map(() => {
          return true;
        }),
        catchError((error: HttpErrorResponse) => {

          this.toastr.error(error.error.message, 'خطا', {timeOut: 2500});
          this.loading.loadingOff();

          return of(false);
        }));
  }

  getCurrentUser(): Observable<AccountModel> {

    return this.http.get<AccountModel>(`${environment.authBaseApiUrl}/get-currentUser`)
      .pipe(
        finalize(() => this.loading.loadingOff()),
        catchError((error: HttpErrorResponse) => {
          this.toastr.error(error.error.message, 'خطا', {timeOut: 2500});
          return throwError(error);
        })
      )
  }

  private updateStatusOnPageRefresh(): void {
    this.isAuthUserLoggedIn()
      .subscribe(res => this.authStatusSource.next(res))
  }
}
