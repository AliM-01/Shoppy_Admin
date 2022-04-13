import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { IResponse } from '@app_models/_common/IResponse';
import { environment } from '@environments/environment';
import { CreateProductPictureModel, ProductPictureModel } from '@app_models/shop/product-picture/_index';
import { ToastrService } from 'ngx-toastr';
import { LoadingService } from '@loading-service';
import { catchError, tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'any'
})
export class ProductPictureService {
  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private loading: LoadingService,
  ) { }


  getProductPictures(productId: string): Observable<ProductPictureModel[]> {
    this.loading.loadingOn();

    return this.http.get<ProductPictureModel[]>
      (`${environment.shopBaseApiUrl}/product-picture/${productId}`)
      .pipe(
        tap(() => this.loading.loadingOff()),
        catchError((error: HttpErrorResponse) => {

          this.toastr.error(error.error.message, 'خطا', { timeOut: 2500 });
          this.loading.loadingOff();

          return throwError(error);
        })
      );
  }

  createProductPicture(createData: CreateProductPictureModel): Observable<IResponse> {
    this.loading.loadingOn();

    const formData = new FormData();

    formData.append('productId', createData.productId);

    for (var i = 0; i < createData.imageFiles.length; i++) {
      formData.append("imageFiles", createData.imageFiles[i]);
    }

    return this.http.post<IResponse>
      (`${environment.shopBaseApiUrl}/product-picture/create`, formData)
      .pipe(
        tap((res: IResponse) => {

          this.toastr.success(res.message, 'موفقیت', { timeOut: 1500 });
          this.loading.loadingOff();

        }),
        catchError((error: HttpErrorResponse) => {

          this.toastr.error(error.error.message, 'خطا', { timeOut: 2500 });
          this.loading.loadingOff();

          return throwError(error);
        })
      );
  }

  removeProductPicture(productPictureId: string): Observable<IResponse> {
    return this.http.delete<IResponse>
      (`${environment.shopBaseApiUrl}/product-picture/remove/${productPictureId}`)
      .pipe(
        tap(() => this.loading.loadingOff()),
        catchError((error: HttpErrorResponse) => {

          this.toastr.error(error.error.message, 'خطا', { timeOut: 2500 });
          this.loading.loadingOff();

          return throwError(error);
        })
      );
  }
}
