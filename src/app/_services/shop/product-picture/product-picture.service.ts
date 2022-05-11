import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {IResponse} from '@app_models/_common/IResponse';
import {environment} from '@app_env';
import {ProductPictureModel} from '@app_models/shop/product-picture/_index';
import {ToastrService} from 'ngx-toastr';
import {LoadingService} from '@loading-service';
import {catchError, finalize} from 'rxjs/operators';
@Injectable({
  providedIn: 'any'
})
export class ProductPictureService {
  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private loading: LoadingService
  ) { }


  getProductPictures(productId: string): Observable<ProductPictureModel[]> {
    this.loading.loadingOn();

    return this.http.get<ProductPictureModel[]>(`${environment.shopBaseApiUrl}/product-picture/${productId}`)
      .pipe(
        finalize(() => this.loading.loadingOff()),
        catchError((error: HttpErrorResponse) => {
          this.toastr.error(error.error.message, 'خطا', {timeOut: 2500});
          return throwError(error);
        })
      );
  }

  removeProductPicture(productPictureId: string): Observable<IResponse> {
    return this.http.delete<IResponse>(`${environment.shopBaseApiUrl}/product-picture/remove/${productPictureId}`)
      .pipe(
        finalize(() => this.loading.loadingOff()),
        catchError((error: HttpErrorResponse) => {
          this.toastr.error(error.error.message, 'خطا', {timeOut: 2500});
          return throwError(error);
        })
      );
  }
}
