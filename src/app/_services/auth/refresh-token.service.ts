import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { AuthTokenType } from "@app_models/auth/auth-token-type";
import { LoginResponseModel } from "@app_models/auth/login-response";
import { RevokeRefreshTokenRequestModel } from "@app_models/auth/revoke-refresh-token-request";
import { IResponse } from "@app_models/_common/IResponse";
import { getCurrentTabId } from "@app_services/_common/functions/functions";
import { environment } from "@environments/environment";
import { Observable, Subscription, throwError, timer } from "rxjs";
import { catchError, map, tap } from 'rxjs/operators';
import { BrowserStorageService } from "./browser-storage.service";
import { TokenStoreService } from "./token-store.service";

@Injectable({
  providedIn: 'root'
})
export class RefreshTokenService {

  private refreshTokenTimerCheckId = "is_refreshToken_timer_started";
  private refreshTokenSubscription: Subscription | null = null;

  constructor(
    private tokenStoreService: TokenStoreService,
    private http: HttpClient,
    private browserStorageService: BrowserStorageService) { }

  scheduleRefreshToken(isAuthUserLoggedIn: boolean, calledFromLogin: boolean) {
    this.unscheduleRefreshToken(false);

    if (!isAuthUserLoggedIn) {
      return;
    }

    const expDateUtc = this.tokenStoreService.getAccessTokenExpirationDateUtc();
    if (!expDateUtc) {
      throw new Error("This access token has not the `exp` property.");
    }
    const expiresAtUtc = expDateUtc.valueOf();
    const nowUtc = new Date().valueOf();
    const threeSeconds = 3000;
    // threeSeconds instead of 1 to prevent other tab timers run less than threeSeconds
    const initialDelay = Math.max(threeSeconds, expiresAtUtc - nowUtc - threeSeconds);
    console.log("Initial scheduleRefreshToken Delay(ms)", initialDelay);
    const timerSource$ = timer(initialDelay);
    this.refreshTokenSubscription = timerSource$.subscribe(() => {
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

  unscheduleRefreshToken(cancelTimerCheckToken: boolean) {
    if (this.refreshTokenSubscription) {
      this.refreshTokenSubscription.unsubscribe();
    }

    if (cancelTimerCheckToken) {
      this.deleteRefreshTokenTimerCheckId();
    }
  }

  invalidateCurrentTabId() {
    const currentTabId = getCurrentTabId(this.browserStorageService);
    const timerStat = this.browserStorageService.getLocal(
      this.refreshTokenTimerCheckId
    );
    if (timerStat && timerStat.tabId === currentTabId) {
      this.setRefreshTokenTimerStopped();
    }
  }

  revokeRefreshTokenRequestModel(refreshToken: string): Observable<IResponse<LoginResponseModel>> {
    console.log('revoke init');
    console.log('revoke old token', refreshToken);

    const formData = new FormData();

    formData.append('refreshToken', refreshToken);

    return this.http
      .post<IResponse<LoginResponseModel>>(`${environment.authBaseApiUrl}/refresh-token`, formData)
      .pipe(
        tap((res) => {
          if(res.status === 'success'){
            console.log("revoke result", res);
            this.tokenStoreService.storeLoginSession(res.data);
            this.deleteRefreshTokenTimerCheckId();
            this.scheduleRefreshToken(true, false);
          }
        }),
        catchError((error: HttpErrorResponse) => throwError(error))
      );
  }

  private refreshToken(isAuthUserLoggedIn: boolean) {

    const formData = new FormData();

    formData.append('refreshToken', this.tokenStoreService.getRawAuthToken(AuthTokenType.RefreshToken));

    let headers:HttpHeaders = new HttpHeaders();
    return this.http
      .post<IResponse<LoginResponseModel>>(`${environment.authBaseApiUrl}/refresh-token`, formData)
      .pipe(
        catchError((error: HttpErrorResponse) => throwError(error))
      )
      .subscribe(result => {
        console.log("RefreshToken Result", result);
        this.tokenStoreService.storeLoginSession(result.data);
        this.deleteRefreshTokenTimerCheckId();
        this.scheduleRefreshToken(isAuthUserLoggedIn, false);
      });
  }

  private isRefreshTokenTimerStartedInAnotherTab(): boolean {

    const currentTabId = getCurrentTabId(this.browserStorageService);
    const timerStat = this.browserStorageService.getLocal(this.refreshTokenTimerCheckId);
    console.log("RefreshTokenTimer Check", {
      refreshTokenTimerCheckId: timerStat,
      currentTabId: currentTabId
    });
    const isStarted = timerStat && timerStat.isStarted === true && timerStat.tabId !== currentTabId;
    if (isStarted) {
      console.log(`RefreshToken timer has already been started in another tab with tabId=${timerStat.tabId}.
      currentTabId=${currentTabId}.`);
    }
    return isStarted;
  }

  private setRefreshTokenTimerStarted(): void {
    this.browserStorageService.setLocal(this.refreshTokenTimerCheckId,
      {
        isStarted: true,
        tabId: getCurrentTabId(this.browserStorageService)
      });
  }

  private deleteRefreshTokenTimerCheckId() {
    this.browserStorageService.removeLocal(this.refreshTokenTimerCheckId);
  }

  private setRefreshTokenTimerStopped(): void {
    this.browserStorageService.setLocal(this.refreshTokenTimerCheckId, {
      isStarted: false,
      tabId: -1
    });
  }
}
