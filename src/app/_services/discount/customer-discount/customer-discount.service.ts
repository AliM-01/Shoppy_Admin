import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { IResponse } from '@app_models/_common/IResponse';
import { environment } from '@environments/environment';
import { CheckProductHasCustomerDiscountResponseModel, DefineCustomerDiscountModel, EditCustomerDiscountModel, FilterCustomerDiscountModel } from '@app_models/discount/customer-discount/_index';
import { ToastrService } from 'ngx-toastr';
import { LoadingService } from '@loading';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'platform'
})
export class CustomerDiscountService {
  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private loading: LoadingService,
  ) { }


  filterCustomerDiscount(filter: FilterCustomerDiscountModel): Observable<IResponse<FilterCustomerDiscountModel>> {
    this.loading.loadingOn();

    let params;

    if (filter !== null) {
      params = new HttpParams()
        .set('productId', filter.productId.toString() === '' ? '0' : filter.productId.toString())
        .set('productTitle', filter.productTitle);
    }

    return this.http.get<IResponse<FilterCustomerDiscountModel>>
      (`${environment.discountBaseApiUrl}/customer-discount/filter`, { params })
      .pipe(
        tap(() => this.loading.loadingOff()),
        catchError((error: HttpErrorResponse) => {

          this.toastr.error(error.error.message, 'خطا', { timeOut: 2500 });
          this.loading.loadingOff();

          return throwError(error);
        })
      );
  }

  getCustomerDiscountDetails(id: number): Observable<IResponse<EditCustomerDiscountModel>> {
    this.loading.loadingOn();

    return this.http.get<IResponse<EditCustomerDiscountModel>>
      (`${environment.discountBaseApiUrl}/customer-discount/${id}`)
      .pipe(
        tap(() => this.loading.loadingOff()),
        catchError((error: HttpErrorResponse) => {

          this.toastr.error(error.error.message, 'خطا', { timeOut: 2500 });
          this.loading.loadingOff();

          return throwError(error);
        })
      );
  }

  defineCustomerDiscount(createData: DefineCustomerDiscountModel): Observable<IResponse<any>> {

    this.loading.loadingOn();

    const formData = new FormData();

    formData.append('rate', createData.rate.toString());
    formData.append('productId', createData.productId.toString());
    formData.append('startDate', createData.startDate);
    formData.append('endDate', createData.endDate);
    formData.append('description', createData.description);

    return this.http.post<IResponse<any>>
      (`${environment.discountBaseApiUrl}/customer-discount/define`, formData)
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

  editCustomerDiscount(editData: EditCustomerDiscountModel): Observable<IResponse<any>> {
    this.loading.loadingOn();

    const formData = new FormData();

    formData.append('id', editData.id.toString());
    formData.append('productId', editData.productId.toString());
    formData.append('rate', editData.rate.toString());
    formData.append('startDate', editData.startDate);
    formData.append('endDate', editData.endDate);
    formData.append('description', editData.description);

    return this.http.put<IResponse<any>>
      (`${environment.discountBaseApiUrl}/customer-discount/edit`, formData)
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

  deleteCustomerDiscount(CustomerDiscountId: number): Observable<IResponse<any>> {
    this.loading.loadingOn();

    return this.http.delete<IResponse<any>>
      (`${environment.discountBaseApiUrl}/customer-discount/remove/${CustomerDiscountId}`)
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

  checkProductHasCustomerDiscount(productId: number)
    : Observable<IResponse<CheckProductHasCustomerDiscountResponseModel>> {
    this.loading.loadingOn();

    return this.http.get<IResponse<CheckProductHasCustomerDiscountResponseModel>>
      (`${environment.discountBaseApiUrl}/customer-discount/check-product-has-discount/${productId}`)
      .pipe(
        tap((res: IResponse<CheckProductHasCustomerDiscountResponseModel>) => {
          if (res.data.existsCustomerDiscount === true) {
            this.toastr.info("برای این محصول یک تخفیف فعال وجود دارد", "اطلاعات", { timeOut: 500 });
          }
          this.loading.loadingOff()
        }),
        catchError((error: HttpErrorResponse) => {

          this.toastr.error(error.error.message, 'خطا', { timeOut: 2500 });
          this.loading.loadingOff();

          return throwError(error);
        })
      );
  }

}