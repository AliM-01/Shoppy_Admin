import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IResponse } from '@app_models/_common/IResponse';
import { environment } from '@environments/environment';
import { tap, catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { LoadingService } from '@loading-service';
import { FilterOrderModel } from '@app_models/order/filter-inventory';
import { OrderItemModel } from '@app_models/order/order-item';

@Injectable({
  providedIn: 'platform'
})
export class OrderService {
  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private loading: LoadingService,
  ) { }


  filterOrder(filter: FilterOrderModel): Observable<IResponse<FilterOrderModel>> {

    this.loading.loadingOn()

    let params = new HttpParams()
      .set('PaymentState', filter.paymentState);

    if(filter.userNames){
      params.set('UserNames', filter.userNames)
    }
    return this.http.get<IResponse<FilterOrderModel>>
      (`${environment.orderBaseApiUrl}/filter`, { params })
      .pipe(
        tap(() => this.loading.loadingOff()),
        catchError((error: HttpErrorResponse) => {

          this.toastr.error(error.error.message, 'خطا', { timeOut: 2500 });
          this.loading.loadingOff();

          return throwError(error);
        })
      );
  }

  getItems(orderId: string): Observable<IResponse<OrderItemModel[]>> {

    this.loading.loadingOn()

    return this.http.get<IResponse<OrderItemModel[]>>
      (`${environment.orderBaseApiUrl}/${orderId}/items`)
      .pipe(
        tap(() => this.loading.loadingOff()),
        catchError((error: HttpErrorResponse) => {

          this.toastr.error(error.error.message, 'خطا', { timeOut: 2500 });
          this.loading.loadingOff();

          return throwError(error);
        })
      );
  }

  cancel(orderId: string): Observable<IResponse<any>> {

    this.loading.loadingOn()

    return this.http.delete<IResponse<any>>
      (`${environment.orderBaseApiUrl}/cancel/${orderId}`)
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
