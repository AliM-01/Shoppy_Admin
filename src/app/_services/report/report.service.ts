import {Injectable} from "@angular/core";
import {ToastrService} from "ngx-toastr";
import {Observable, throwError} from "rxjs";
import {ChartModel} from '@app_models/report/chart';
import {environment} from '@app_env';
import {catchError, tap} from 'rxjs/operators';
import {LoadingService} from '@loading-service';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";

@Injectable({
  providedIn: 'platform'
})
export class ReportService {
  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private loading: LoadingService
  ) { }

  orders(): Observable<ChartModel[]> {

    this.loading.loadingOn()

    return this.http.get<ChartModel[]>(`${environment.reportBaseApiUrl}/orders`)
      .pipe(
        tap(() => this.loading.loadingOff()),
        catchError((error: HttpErrorResponse) => {

          this.toastr.error(error.error.message, 'خطا', {timeOut: 2500});
          this.loading.loadingOff();

          return throwError(error);
        })
      );
  }

  productSale(): Observable<ChartModel[]> {

    this.loading.loadingOn()

    return this.http.get<ChartModel[]>(`${environment.reportBaseApiUrl}/product-sales`)
      .pipe(
        tap(() => this.loading.loadingOff()),
        catchError((error: HttpErrorResponse) => {

          this.toastr.error(error.error.message, 'خطا', {timeOut: 2500});
          this.loading.loadingOff();

          return throwError(error);
        })
      );
  }
}
