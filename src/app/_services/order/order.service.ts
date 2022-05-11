import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {IResponse} from '@app_models/_common/IResponse';
import {environment} from '@app_env';
import {tap, catchError, finalize} from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';
import {ToastrService} from 'ngx-toastr';
import {LoadingService} from '@loading-service';
import {OrderModel, FilterOrderModel, OrderItemModel} from '@app_models/order/_index';

@Injectable({
  providedIn: 'platform'
})
export class OrderService {

  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private loading: LoadingService
  ) { }


  filterOrder(filter: FilterOrderModel): Observable<FilterOrderModel> {

    this.loading.loadingOn()

    let params = new HttpParams()
      .set('PaymentState', filter.paymentState);

    if (filter.userNames){
      params = params.set('UserNames', filter.userNames)
    }
    return this.http.get<FilterOrderModel>(`${environment.orderBaseApiUrl}/filter`, {params})
      .pipe(
        finalize(() => this.loading.loadingOff()),
        catchError((error: HttpErrorResponse) => {
          this.toastr.error(error.error.message, 'خطا', {timeOut: 2500});
          return throwError(error);
        })
      );
  }

  getUserOrders(userId: string): Observable<OrderModel[]> {

    this.loading.loadingOn()

    return this.http.get<OrderModel[]>(`${environment.orderBaseApiUrl}/${userId}`)
      .pipe(
        finalize(() => this.loading.loadingOff()),
        catchError((error: HttpErrorResponse) => {
          this.toastr.error(error.error.message, 'خطا', {timeOut: 2500});
          return throwError(error);
        })
      );
  }

  getItems(orderId: string): Observable<OrderItemModel[]> {

    this.loading.loadingOn()

    return this.http.get<OrderItemModel[]>(`${environment.orderBaseApiUrl}/${orderId}/items`)
      .pipe(
        finalize(() => this.loading.loadingOff()),
        catchError((error: HttpErrorResponse) => {
          this.toastr.error(error.error.message, 'خطا', {timeOut: 2500});
          return throwError(error);
        })
      );
  }

  cancel(orderId: string): Observable<IResponse> {

    this.loading.loadingOn()

    return this.http.delete<IResponse>(`${environment.orderBaseApiUrl}/cancel/${orderId}`)
      .pipe(
        finalize(() => this.loading.loadingOff()),
        tap((res: IResponse) => this.toastr.success(res.message, 'موفقیت', {timeOut: 1500})),
        catchError((error: HttpErrorResponse) => {
          this.toastr.error(error.error.message, 'خطا', {timeOut: 2500});
          return throwError(error);
        })
      );
  }

}
