import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {AuthTokenType} from "@app_models/auth/auth-token-type";
import {LoginResponseModel} from "@app_models/auth/login-response";
import {getCurrentTabId} from "@app_services/_common/functions/functions";
import {environment} from "@app_env";
import {Observable, Subscription, throwError, timer} from "rxjs";
import {catchError, tap} from 'rxjs/operators';
import {TokenStoreService, BrowserStorageService} from "./_index";

@Injectable({
  providedIn: 'root'
})
export class RefreshTokenService {

  private REFRESH_TOKEN_TIMER_CHECK_ID = "is_refreshToken_timer_started";
  private refreshTokenSubscription: Subscription | null = null;

  constructor(
    private tokenStoreService: TokenStoreService,
    private http: HttpClient,
    private browserStorageService: BrowserStorageService) { }

  scheduleRefreshToken(isAuthUserLoggedIn: boolean, calledFromLogin: boolean): void {
    this.unscheduleRefreshToken(false);

    if (!isAuthUserLoggedIn) {
      return;
    }

    const expDateUtc = this.tokenStoreService.getAccessTokenExpirationDateUtc();
    if (!expDateUtc) {
      return;
    }

    const expiresAtUtc = expDateUtc.valueOf();
    const nowUtc = new Date().valueOf();
    const threeSeconds = 3000;

    const initialDelay = Math.max(threeSeconds, expiresAtUtc - nowUtc - threeSeconds);

    const timerSource$ = timer(initialDelay);

    this.refreshTokenSubscription = timerSource$
      .subscribe(() => {
        if (calledFromLogin || !this.isRefreshTokenTimerStartedInAnotherTab()) {
          this.refreshToken(isAuthUserLoggedIn);
        } else {
          this.scheduleRefreshToken(isAuthUserLoggedIn, false);
        }
      });

    if (calledFromLogin || !this.isRefreshTokenTimerStartedInAnotherTab()) {
      this.setRefreshTokenTimerStarted();
    }
  }

  unscheduleRefreshToken(cancelTimerCheckToken: boolean): void {
    if (this.refreshTokenSubscription) {
      this.refreshTokenSubscription.unsubscribe();
    }

    if (cancelTimerCheckToken) {
      this.deleteRefreshTokenTimerCheckId();
    }
  }

  invalidateCurrentTabId(): void {
    const currentTabId = getCurrentTabId(this.browserStorageService);
    const timerStat = this.browserStorageService.getLocal(
      this.REFRESH_TOKEN_TIMER_CHECK_ID
    );
    if (timerStat && timerStat.tabId === currentTabId) {
      this.setRefreshTokenTimerStopped();
    }
  }

  revokeRefreshTokenRequestModel(refreshToken: string): Observable<LoginResponseModel> {
    const formData = new FormData();

    formData.append('RefreshToken', refreshToken);

    return this.http
      .post<LoginResponseModel>(`${environment.authBaseApiUrl}/refresh-token`, formData)
      .pipe(
        tap((res) => {
          this.tokenStoreService.storeLoginSession(res);
          this.deleteRefreshTokenTimerCheckId();
          this.scheduleRefreshToken(true, false);
        }),
        catchError((error: HttpErrorResponse) => throwError(error))
      );
  }

  private refreshToken(isAuthUserLoggedIn: boolean): Subscription {

    const formData = new FormData();

    formData.append('RefreshToken', this.tokenStoreService.getRawAuthToken(AuthTokenType.RefreshToken));

    return this.http
      .post<LoginResponseModel>(`${environment.authBaseApiUrl}/refresh-token`, formData)
      .pipe(
        catchError((error: HttpErrorResponse) => throwError(error))
      )
      .subscribe(result => {
        this.tokenStoreService.storeLoginSession(result);
        this.deleteRefreshTokenTimerCheckId();
        this.scheduleRefreshToken(isAuthUserLoggedIn, false);
      });
  }

  private isRefreshTokenTimerStartedInAnotherTab(): boolean {

    const currentTabId = getCurrentTabId(this.browserStorageService);
    const timerStat = this.browserStorageService.getLocal(this.REFRESH_TOKEN_TIMER_CHECK_ID);

    const isStarted = timerStat && timerStat.isStarted === true && timerStat.tabId !== currentTabId;

    return isStarted;
  }

  private setRefreshTokenTimerStarted(): void {
    this.browserStorageService.setLocal(this.REFRESH_TOKEN_TIMER_CHECK_ID,
      {
        isStarted: true,
        tabId: getCurrentTabId(this.browserStorageService)
      });
  }

  private deleteRefreshTokenTimerCheckId(): void {
    this.browserStorageService.removeLocal(this.REFRESH_TOKEN_TIMER_CHECK_ID);
  }

  private setRefreshTokenTimerStopped(): void {
    this.browserStorageService.setLocal(this.REFRESH_TOKEN_TIMER_CHECK_ID, {
      isStarted: false,
      tabId: -1
    });
  }
}
