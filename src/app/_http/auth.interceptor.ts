import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AuthTokenType } from "@app_models/auth/auth-token-type";
import { RefreshTokenService } from "@app_services/auth/refresh-token.service";
import { TokenStoreService } from "@app_services/auth/token-store.service";
import { ToastrService } from "ngx-toastr";
import { Observable, of, throwError } from "rxjs";
import { catchError, delay, mergeMap, retryWhen, take } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private toastr: ToastrService,
    private tokenStoreService: TokenStoreService,
    private refreshTokenService: RefreshTokenService,
    private router: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('inercept init');

    const accessToken = this.tokenStoreService.getRawAuthToken(AuthTokenType.AccessToken);

    if (accessToken !== '') {
      request = request.clone({
        headers: request.headers.append('Authorization', 'Bearer ' + accessToken)
      });
      return next.handle(request)
        .pipe(
          catchError((error: HttpErrorResponse) => {
            if(error.status === 0){
              this.router.navigate(["/auth/access-denied"]);
            } else {
              this.toastr.error("عملیات با خطا مواجه شد", "خطا")
              this.router.navigate(["/"]);
            }
            return throwError(error);
          })
        );
    } else {
      // login page
      return next.handle(request);
    }
  }

  getNewAuthRequest(request: HttpRequest<any>): HttpRequest<any> | null {
    console.log('new token init');
    const oldAccessToken = this.tokenStoreService.getRawAuthToken(AuthTokenType.AccessToken);
    if (oldAccessToken !== '') {
      this.refreshTokenService.revokeRefreshTokenRequestModel(oldAccessToken)
        .subscribe(res => {
          console.log('new token success');
          console.log('new token token', res.data.accessToken);

          if (res.status !== 'success') {
            return request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + res.data.accessToken) });
          }
          return request;
        })
    }
    return request;
  }
}
