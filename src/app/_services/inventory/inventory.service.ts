import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IResponse } from '@app_models/_common/IResponse';
import { CreateInventoryModel, EditInventoryModel, FilterInventoryModel, GetInventoryOperationsModel, IncreaseInventoryModel, ReduceInventoryModel } from '@app_models/inventory/_index';
import { environment } from '@environments/environment';
import { tap, catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { InventoryOperationModel } from '@app_models/inventory/inventory-operation';
import { ToastrService } from 'ngx-toastr';
import { LoadingService } from '@loading';

@Injectable({
  providedIn: 'platform'
})
export class InventoryService {
  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private loading: LoadingService,
  ) { }

  filterInventory(filter: FilterInventoryModel): Observable<IResponse<FilterInventoryModel>> {

    this.loading.loadingOn()

    let params = new HttpParams()
      .set('InStockState', filter.inStockState);

    if (filter.productId) {
      params.set('ProductId', filter.productId)
    }

    return this.http.get<IResponse<FilterInventoryModel>>
      (`${environment.inventoryBaseApiUrl}/filter`, { params })
      .pipe(
        tap(() => this.loading.loadingOff()),
        catchError((error: HttpErrorResponse) => {

          this.toastr.error(error.error.message, 'خطا', { timeOut: 2500 });
          this.loading.loadingOff();

          return throwError(error);
        })
      );
  }

  getInventoryDetails(id: string): Observable<IResponse<EditInventoryModel>> {

    this.loading.loadingOn()

    return this.http.get<IResponse<EditInventoryModel>>
      (`${environment.inventoryBaseApiUrl}/${id}`)
      .pipe(
        tap(() => this.loading.loadingOff()),
        catchError((error: HttpErrorResponse) => {

          this.toastr.error(error.error.message, 'خطا', { timeOut: 2500 });
          this.loading.loadingOff();

          return throwError(error);
        })
      );
  }

  createInventory(createData: CreateInventoryModel): Observable<IResponse<any>> {

    this.loading.loadingOn();

    const formData = new FormData();

    formData.append('unitPrice', createData.unitPrice.toString());
    formData.append('productId', createData.productId);

    return this.http.post<IResponse<any>>
      (`${environment.inventoryBaseApiUrl}/create`, formData)
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

  editInventory(editData: EditInventoryModel): Observable<IResponse<any>> {

    this.loading.loadingOn();

    const formData = new FormData();

    formData.append('id', editData.id);
    formData.append('unitPrice', editData.unitPrice.toString());
    formData.append('productId', editData.productId);

    return this.http.put<IResponse<any>>
      (`${environment.inventoryBaseApiUrl}/edit`, formData)
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

  increaseInventory(increaseData: IncreaseInventoryModel): Observable<IResponse<any>> {

    this.loading.loadingOn();

    const formData = new FormData();

    formData.append('inventoryId', increaseData.inventoryId);
    formData.append('count', increaseData.count.toString());
    formData.append('description', increaseData.description.toString());

    return this.http.post<IResponse<any>>
      (`${environment.inventoryBaseApiUrl}/increase`, formData)
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

  reduceInventory(reduceData: ReduceInventoryModel): Observable<IResponse<any>> {

    this.loading.loadingOn();

    const formData = new FormData();

    formData.append('inventoryId', reduceData.inventoryId);
    formData.append('orderId', reduceData.orderId.toString());
    formData.append('productId', reduceData.productId.toString());
    formData.append('count', reduceData.count.toString());
    formData.append('description', reduceData.description.toString());

    return this.http.post<IResponse<any>>
      (`${environment.inventoryBaseApiUrl}/reduce`, formData)
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

  getInventoryOperationLog(id: string): Observable<IResponse<GetInventoryOperationsModel>> {

    this.loading.loadingOn();

    return this.http.get<IResponse<GetInventoryOperationsModel>>
      (`${environment.inventoryBaseApiUrl}/get-operation-log/${id}`)
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
