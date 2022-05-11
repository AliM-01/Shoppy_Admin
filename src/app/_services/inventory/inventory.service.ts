import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {IResponse} from '@app_models/_common/IResponse';
import {EditInventoryModel, FilterInventoryModel, GetInventoryOperationsModel, IncreaseInventoryModel, ReduceInventoryModel} from '@app_models/inventory/_index';
import {environment} from '@app_env';
import {tap, catchError, finalize} from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';
import {ToastrService} from 'ngx-toastr';
import {LoadingService} from '@loading-service';

@Injectable({
  providedIn: 'platform'
})
export class InventoryService {
  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private loading: LoadingService
  ) { }

  filterInventory(filter: FilterInventoryModel): Observable<FilterInventoryModel> {

    this.loading.loadingOn()

    let params = new HttpParams()
      .set('InStockState', filter.inStockState);

    if (filter.productTitle) {
      params = params.set('ProductTitle', filter.productTitle)
    }

    return this.http.get<FilterInventoryModel>(`${environment.inventoryBaseApiUrl}/filter`, {params})
      .pipe(
        finalize(() => this.loading.loadingOff()),
        catchError((error: HttpErrorResponse) => {
          this.toastr.error(error.error.message, 'خطا', {timeOut: 2500});
          return throwError(error);
        })
      );
  }

  getInventoryDetails(id: string): Observable<EditInventoryModel> {

    this.loading.loadingOn()

    return this.http.get<EditInventoryModel>(`${environment.inventoryBaseApiUrl}/${id}`)
      .pipe(
        finalize(() => this.loading.loadingOff()),
        catchError((error: HttpErrorResponse) => {
          this.toastr.error(error.error.message, 'خطا', {timeOut: 2500});
          return throwError(error);
        })
      );
  }

  editInventory(editData: EditInventoryModel): Observable<IResponse> {

    this.loading.loadingOn();

    const formData = new FormData();

    formData.append('id', editData.id);
    formData.append('unitPrice', editData.unitPrice.toString());
    formData.append('productId', editData.productId);

    return this.http.put<IResponse>(`${environment.inventoryBaseApiUrl}/edit`, formData)
      .pipe(
        finalize(() => this.loading.loadingOff()),
        tap((res: IResponse) => this.toastr.success(res.message, 'موفقیت', {timeOut: 1500})),
        catchError((error: HttpErrorResponse) => {
          this.toastr.error(error.error.message, 'خطا', {timeOut: 2500});
          return throwError(error);
        })
      );
  }

  increaseInventory(increaseData: IncreaseInventoryModel): Observable<IResponse> {

    this.loading.loadingOn();

    const formData = new FormData();

    formData.append('inventoryId', increaseData.inventoryId);
    formData.append('count', increaseData.count.toString());
    formData.append('description', increaseData.description);

    return this.http.post<IResponse>(`${environment.inventoryBaseApiUrl}/increase`, formData)
      .pipe(
        finalize(() => this.loading.loadingOff()),
        tap((res: IResponse) => this.toastr.success(res.message, 'موفقیت', {timeOut: 1500})),
        catchError((error: HttpErrorResponse) => {
          this.toastr.error(error.error.message, 'خطا', {timeOut: 2500});
          return throwError(error);
        })
      );
  }

  reduceInventory(reduceData: ReduceInventoryModel): Observable<IResponse> {

    this.loading.loadingOn();

    const formData = new FormData();

    formData.append('inventoryId', reduceData.inventoryId);
    formData.append('orderId', reduceData.orderId);
    formData.append('productId', reduceData.productId);
    formData.append('count', reduceData.count.toString());
    formData.append('description', reduceData.description);

    return this.http.post<IResponse>(`${environment.inventoryBaseApiUrl}/reduce`, formData)
      .pipe(
        finalize(() => this.loading.loadingOff()),
        tap((res: IResponse) => this.toastr.success(res.message, 'موفقیت', {timeOut: 1500})),
        catchError((error: HttpErrorResponse) => {
          this.toastr.error(error.error.message, 'خطا', {timeOut: 2500});
          return throwError(error);
        })
      );
  }

  getInventoryOperationLog(id: string): Observable<GetInventoryOperationsModel> {

    this.loading.loadingOn();

    return this.http.get<GetInventoryOperationsModel>(`${environment.inventoryBaseApiUrl}/${id}/logs`)
      .pipe(
        finalize(() => this.loading.loadingOff()),
        catchError((error: HttpErrorResponse) => {
          this.toastr.error(error.error.message, 'خطا', {timeOut: 2500});
          return throwError(error);
        })
      );
  }

}
