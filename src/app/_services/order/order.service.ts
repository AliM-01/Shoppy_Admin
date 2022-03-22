import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IResponse } from '@app_models/_common/IResponse';
import { environment } from '@environments/environment';
import { tap, catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { LoadingService } from '@loading';
import { FilterOrderModel } from '@app_models/order/filter-inventory';

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

    let params = new HttpParams();

    if(filter.userNames){
      params.set('UserNames', filter.userNames)
    }

    if(filter.paymentState){
      params.set('PaymentState', filter.paymentState)
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

}
