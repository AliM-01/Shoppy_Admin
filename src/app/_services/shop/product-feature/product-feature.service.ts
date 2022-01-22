import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { IResponse } from '@app/_models/common/IResponse';
import { environment } from '@environments/environment';
import { CreateProductFeatureModel, EditProductFeatureModel, FilterProductFeatureModel }
 from '@app_models/shop/product-feature/_index';
import { ToastrService } from 'ngx-toastr';
import { LoadingService } from '@loading';
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


  filterProductFeature(filter: FilterProductFeatureModel): Observable<IResponse<FilterProductFeatureModel>> {
    
    this.loading.loadingOn();

    let params;

    if (filter !== null) {
      params = new HttpParams()
        .set('ProductId', filter.productId)
    }

    return this.http.get<IResponse<FilterProductFeatureModel>>
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

  getProductFeatureDetails(id: number): Observable<IResponse<EditProductFeatureModel>> {

    this.loading.loadingOn();

    return this.http.get<IResponse<EditProductFeatureModel>>
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

  createProductFeature(createData: CreateProductFeatureModel):Observable<IResponse<any>> {

    this.loading.loadingOn();

    const formData = new FormData();
    
    formData.append('productId', createData.productId);
    formData.append('featureTitle', createData.featureTitle);
    formData.append('featureValue', createData.featureValue);
    
    return this.http.post<IResponse<any>>
    (`${environment.shopBaseApiUrl}/product-feature/create`, formData)
    .pipe(
      tap((res: IResponse<any>) => {

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

  editProductFeature(editData: EditProductFeatureModel):Observable<IResponse<any>> {
    
    this.loading.loadingOn();

    const formData = new FormData();

    formData.append('id', editData.id.toString());
    formData.append('productId', editData.productId);
    formData.append('featureTitle', editData.featureTitle);
    formData.append('featureValue', editData.featureValue);
    
    return this.http.put<IResponse<any>>
    (`${environment.shopBaseApiUrl}/product-feature/edit`, formData)
    .pipe(
      tap((res: IResponse<any>) => {

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

  deleteProductFeature(productFeatureId: number):Observable<IResponse<any>> {
    this.loading.loadingOn();

    return this.http.delete<IResponse<any>>
    (`${environment.shopBaseApiUrl}/product-feature/delete/${productFeatureId}`)
    .pipe(
      tap((res: IResponse<any>) => {

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