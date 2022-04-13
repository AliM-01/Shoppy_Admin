import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { IResponse } from '@app_models/_common/IResponse';
import { environment } from '@environments/environment';
import { ToastrService } from 'ngx-toastr';
import { LoadingService } from '@loading-service';
import { catchError, tap } from 'rxjs/operators';
import { FilterDiscountCodeModel } from '@app_models/discount/discount-code/filter-discount-code';
import { EditDiscountCodeModel } from '@app_models/discount/discount-code/edit-discount-code';
import { DefineDiscountCodeModel } from '@app_models/discount/discount-code/define-discount-code';

@Injectable({
  providedIn: 'platform'
})
export class DiscountCodeService {
  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private loading: LoadingService,
  ) { }


  filterDiscountCode(filter: FilterDiscountCodeModel): Observable<FilterDiscountCodeModel> {
    this.loading.loadingOn();

    let params = new HttpParams();

    if (filter.phrase) {
      params = params.set('phrase', filter.phrase);
    }

    return this.http.get<FilterDiscountCodeModel>
      (`${environment.discountBaseApiUrl}/discount-code/filter`, { params })
      .pipe(
        tap(() => this.loading.loadingOff()),
        catchError((error: HttpErrorResponse) => {

          this.toastr.error(error.error.message, 'خطا', { timeOut: 2500 });
          this.loading.loadingOff();

          return throwError(error);
        })
      );
  }

  getDiscountCodeDetails(id: string): Observable<EditDiscountCodeModel> {
    this.loading.loadingOn();

    return this.http.get<EditDiscountCodeModel>
      (`${environment.discountBaseApiUrl}/discount-code/${id}`)
      .pipe(
        tap(() => this.loading.loadingOff()),
        catchError((error: HttpErrorResponse) => {

          this.toastr.error(error.error.message, 'خطا', { timeOut: 2500 });
          this.loading.loadingOff();

          return throwError(error);
        })
      );
  }

  defineDiscountCode(createData: DefineDiscountCodeModel): Observable<IResponse> {

    this.loading.loadingOn();

    const formData = new FormData();

    formData.append('rate', createData.rate.toString());
    formData.append('code', createData.code);
    formData.append('startDate', createData.startDate);
    formData.append('endDate', createData.endDate);
    formData.append('description', createData.description);

    return this.http.post<IResponse>
      (`${environment.discountBaseApiUrl}/discount-code/define`, formData)
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

  editDiscountCode(editData: EditDiscountCodeModel): Observable<IResponse> {
    this.loading.loadingOn();

    const formData = new FormData();

    formData.append('id', editData.id.toString());
    formData.append('code', editData.code);
    formData.append('rate', editData.rate.toString());
    formData.append('startDate', editData.startDate);
    formData.append('endDate', editData.endDate);
    formData.append('description', editData.description);

    return this.http.put<IResponse>
      (`${environment.discountBaseApiUrl}/discount-code/edit`, formData)
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

  deleteDiscountCode(discountCodeId: string): Observable<IResponse> {
    this.loading.loadingOn();

    return this.http.delete<IResponse>
      (`${environment.discountBaseApiUrl}/discount-code/remove/${discountCodeId}`)
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
