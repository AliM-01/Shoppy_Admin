import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { IResponse } from '@app_models/_common/IResponse';
import { environment } from '@environments/environment';
import { CheckProductHasColleagueDiscountResponseModel, DefineColleagueDiscountModel, EditColleagueDiscountModel, FilterColleagueDiscountModel } from '@app_models/discount/colleague-discount/_index';
import { ToastrService } from 'ngx-toastr';
import { LoadingService } from '@loading';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'platform'
})
export class ColleagueDiscountService {
  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private loading: LoadingService,
  ) { }


  filterColleagueDiscount(filter: FilterColleagueDiscountModel): Observable<IResponse<FilterColleagueDiscountModel>> {

    this.loading.loadingOn();

    let params;

    if (filter !== null) {
      params = new HttpParams()
        .set('productId', filter.productId.toString() === '' ? '' : filter.productId.toString())
        .set('productTitle', filter.productTitle);
    }

    return this.http.get<IResponse<FilterColleagueDiscountModel>>
      (`${environment.discountBaseApiUrl}/colleague-discount/filter`, { params })
      .pipe(
        tap(() => this.loading.loadingOff()),
        catchError((error: HttpErrorResponse) => {

          this.toastr.error(error.error.message, 'خطا', { timeOut: 2500 });
          this.loading.loadingOff();

          return throwError(error);
        })
      );
  }

  getColleagueDiscountDetails(id: string): Observable<IResponse<EditColleagueDiscountModel>> {
    this.loading.loadingOn();

    return this.http.get<IResponse<EditColleagueDiscountModel>>
      (`${environment.discountBaseApiUrl}/colleague-discount/${id}`)
      .pipe(
        tap(() => this.loading.loadingOff()),
        catchError((error: HttpErrorResponse) => {

          this.toastr.error(error.error.message, 'خطا', { timeOut: 2500 });
          this.loading.loadingOff();

          return throwError(error);
        })
      );
  }

  defineColleagueDiscount(createData: DefineColleagueDiscountModel): Observable<IResponse<any>> {
    this.loading.loadingOn();

    const formData = new FormData();

    formData.append('rate', createData.rate.toString());
    formData.append('productId', createData.productId.toString());

    return this.http.post<IResponse<any>>
      (`${environment.discountBaseApiUrl}/colleague-discount/define`, formData)
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

  editColleagueDiscount(editData: EditColleagueDiscountModel): Observable<IResponse<any>> {

    this.loading.loadingOn();

    const formData = new FormData();

    formData.append('id', editData.id.toString());
    formData.append('productId', editData.productId.toString());
    formData.append('rate', editData.rate.toString());

    return this.http.put<IResponse<any>>
      (`${environment.discountBaseApiUrl}/colleague-discount/edit`, formData)
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

  removeColleagueDiscount(ColleagueDiscountId: string): Observable<IResponse<any>> {
    this.loading.loadingOn();

    return this.http.post<IResponse<any>>
      (`${environment.discountBaseApiUrl}/colleague-discount/remove/${ColleagueDiscountId}`, null!)
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

  restoreColleagueDiscount(ColleagueDiscountId: string): Observable<IResponse<any>> {
    this.loading.loadingOn();

    return this.http.post<IResponse<any>>
      (`${environment.discountBaseApiUrl}/colleague-discount/restore/${ColleagueDiscountId}`, null)
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

  deleteColleagueDiscount(ColleagueDiscountId: string): Observable<IResponse<any>> {
    this.loading.loadingOn();

    return this.http.delete<IResponse<any>>
      (`${environment.discountBaseApiUrl}/colleague-discount/delete/${ColleagueDiscountId}`)
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

  checkProductHasColleagueDiscount(productId: string)
    : Observable<IResponse<CheckProductHasColleagueDiscountResponseModel>> {
    this.loading.loadingOn();

    return this.http.get<IResponse<CheckProductHasColleagueDiscountResponseModel>>
      (`${environment.discountBaseApiUrl}/colleague-discount/check-product-has-discount/${productId}`)
      .pipe(
        tap((res: IResponse<CheckProductHasColleagueDiscountResponseModel>) => { 
          if (res.data.existsColleagueDiscount === true) {
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