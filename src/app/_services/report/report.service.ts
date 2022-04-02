import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { Observable, throwError } from "rxjs";
import { IResponse } from '@app_models/_common/IResponse';
import { ChartModel } from '../../_models/report/chart';
import { environment } from '@environments/environment';
import { catchError, tap } from 'rxjs/operators';
import { LoadingService } from '@loading-service';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";

@Injectable({
  providedIn: 'platform'
})
export class ReportService {
  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private loading: LoadingService,
  ) { }

  orders(): Observable<IResponse<ChartModel[]>> {

    this.loading.loadingOn()

    return this.http.get<IResponse<ChartModel[]>>
      (`${environment.reportBaseApiUrl}/orders`)
      .pipe(
        tap(() => this.loading.loadingOff()),
        catchError((error: HttpErrorResponse) => {

          this.toastr.error(error.error.message, 'خطا', { timeOut: 2500 });
          this.loading.loadingOff();

          return throwError(error);
        })
      );
  }

  productSale(): Observable<IResponse<ChartModel[]>> {

    this.loading.loadingOn()

    return this.http.get<IResponse<ChartModel[]>>
      (`${environment.reportBaseApiUrl}/product-sales`)
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
