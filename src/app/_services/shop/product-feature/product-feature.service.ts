import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { IResponse } from '@app_models/_common/IResponse';
import { environment } from '@app_env';
import { CreateProductFeatureModel, EditProductFeatureModel, FilterProductFeatureModel }
  from '@app_models/shop/product-feature/_index';
import { ToastrService } from 'ngx-toastr';
import { LoadingService } from '@loading-service';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'platform'
})
export class ProductFeatureService {
  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private loading: LoadingService,
  ) { }


  filterProductFeature(filter: FilterProductFeatureModel): Observable<FilterProductFeatureModel> {

    this.loading.loadingOn();

    if(filter.productId === null || filter.productId === undefined)
      return throwError(false);;

    let params = new HttpParams()
      .set('ProductId', filter.productId);

    return this.http.get<FilterProductFeatureModel>
      (`${environment.shopBaseApiUrl}/product-feature/filter`, { params })
      .pipe(
        tap(() => this.loading.loadingOff()),
        catchError((error: HttpErrorResponse) => {

          this.toastr.error(error.error.message, 'خطا', { timeOut: 2500 });
          this.loading.loadingOff();

          return throwError(error);
        })
      );
  }

  getProductFeatureDetails(id: string): Observable<EditProductFeatureModel> {

    this.loading.loadingOn();

    return this.http.get<EditProductFeatureModel>
      (`${environment.shopBaseApiUrl}/product-feature/${id}`)
      .pipe(
        tap(() => this.loading.loadingOff()),
        catchError((error: HttpErrorResponse) => {

          this.toastr.error(error.error.message, 'خطا', { timeOut: 2500 });
          this.loading.loadingOff();

          return throwError(error);
        })
      );
  }

  createProductFeature(createData: CreateProductFeatureModel): Observable<IResponse> {

    this.loading.loadingOn();

    const formData = new FormData();

    formData.append('productId', createData.productId.toString());
    formData.append('featureTitle', createData.featureTitle);
    formData.append('featureValue', createData.featureValue);

    return this.http.post<IResponse>
      (`${environment.shopBaseApiUrl}/product-feature/create`, formData)
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

  editProductFeature(editData: EditProductFeatureModel): Observable<IResponse> {

    this.loading.loadingOn();

    const formData = new FormData();

    formData.append('id', editData.id.toString());
    formData.append('productId', editData.productId.toString());
    formData.append('featureTitle', editData.featureTitle);
    formData.append('featureValue', editData.featureValue);

    return this.http.put<IResponse>
      (`${environment.shopBaseApiUrl}/product-feature/edit`, formData)
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

  deleteProductFeature(productFeatureId: string): Observable<IResponse> {
    this.loading.loadingOn();

    return this.http.delete<IResponse>
      (`${environment.shopBaseApiUrl}/product-feature/delete/${productFeatureId}`)
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

}
