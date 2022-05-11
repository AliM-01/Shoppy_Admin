import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {IResponse} from '@app_models/_common/IResponse';
import {environment} from '@app_env';
import {Observable, throwError} from 'rxjs';
import {CreateProductModel, EditProductModel, ExistsProductIdResponseModel, FilterProductModel} from '@app_models/shop/product/_index';
import {ToastrService} from 'ngx-toastr';
import {LoadingService} from '@loading-service';
import {tap, catchError, finalize} from 'rxjs/operators';

@Injectable({
  providedIn: 'platform'
})
export class ProductService {
  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private loading: LoadingService
  ) { }

  filterProduct(filter: FilterProductModel): Observable<FilterProductModel> {

    this.loading.loadingOn();

    let params = new HttpParams()
      .set('SortCreationDateOrder', filter.sortCreationDateOrder)
      .set('SortIdOrder', filter.sortIdOrder);

    if (filter.search) {
      params = params.set('Search', filter.search)
    }
    // if (filter.categoryId) {
    //   params = params.set('CategoryId', filter.categoryId)
    // }

    return this.http.get<FilterProductModel>(`${environment.shopBaseApiUrl}/product/filter`, {params})
      .pipe(
        finalize(() => this.loading.loadingOff()),
        catchError((error: HttpErrorResponse) => {
          this.toastr.error(error.error.message, 'خطا', {timeOut: 2500});
          return throwError(error);
        })
      );
  }

  existsProductId(id: string): Observable<ExistsProductIdResponseModel> {
    return this.http.get<ExistsProductIdResponseModel>(`${environment.shopBaseApiUrl}/product/exists/${id}`)
      .pipe(
        tap((res: ExistsProductIdResponseModel) => {
          if (res.exists === false) {
            this.toastr.error("محصولی با این شناسه وجود ندارد", "خطا", {timeOut: 500});
          }
          this.loading.loadingOff();

        }),
        catchError((error: HttpErrorResponse) => {
          this.toastr.error(error.error.message, 'خطا', {timeOut: 2500});
          this.loading.loadingOff();

          return throwError(error);
        })
      );
  }

  getProductDetails(id: string): Observable<EditProductModel> {

    this.loading.loadingOn();

    return this.http.get<EditProductModel>(`${environment.shopBaseApiUrl}/product/${id}`)
      .pipe(
        finalize(() => this.loading.loadingOff()),
        catchError((error: HttpErrorResponse) => {
          this.toastr.error(error.error.message, 'خطا', {timeOut: 2500});
          return throwError(error);
        })
      );
  }

  createProduct(createData: CreateProductModel): Observable<IResponse> {
    this.loading.loadingOn();

    const formData = new FormData();

    formData.append('categoryId', createData.categoryId);
    formData.append('title', createData.title);
    formData.append('shortDescription', createData.shortDescription);
    formData.append('description', createData.description);
    formData.append('imageFile', createData.imageFile, createData.imageFile.name);
    formData.append('imageAlt', createData.imageAlt);
    formData.append('imageTitle', createData.imageTitle);
    formData.append('metaKeywords', createData.metaKeywords);
    formData.append('metaDescription', createData.metaDescription);

    return this.http.post<IResponse>(`${environment.shopBaseApiUrl}/product/create`, formData)
      .pipe(
        finalize(() => this.loading.loadingOff()),
        tap((res: IResponse) => this.toastr.success(res.message, 'موفقیت', {timeOut: 1500})),
        catchError((error: HttpErrorResponse) => {
          this.toastr.error(error.error.message, 'خطا', {timeOut: 2500});
          return throwError(error);
        })
      );
  }

  editProduct(editData: EditProductModel): Observable<IResponse> {

    const formData = new FormData();

    formData.append('id', editData.id.toString());
    formData.append('categoryId', editData.categoryId.toString());
    formData.append('title', editData.title);
    formData.append('shortDescription', editData.shortDescription);
    formData.append('description', editData.description);

    if (editData.imageFileUploaded) {
      formData.append('imageFile', editData.imageFile, editData.imageFile.name);
    }

    formData.append('imageAlt', editData.imageAlt);
    formData.append('imageTitle', editData.imageTitle);
    formData.append('metaKeywords', editData.metaKeywords);
    formData.append('metaDescription', editData.metaDescription);

    return this.http.put<IResponse>(`${environment.shopBaseApiUrl}/product/edit`, formData)
      .pipe(
        finalize(() => this.loading.loadingOff()),
        tap((res: IResponse) => this.toastr.success(res.message, 'موفقیت', {timeOut: 1500})),
        catchError((error: HttpErrorResponse) => {
          this.toastr.error(error.error.message, 'خطا', {timeOut: 2500});
          return throwError(error);
        })
      );
  }

  deleteProduct(productId: string): Observable<IResponse> {
    return this.http.delete<IResponse>(`${environment.shopBaseApiUrl}/product/delete/${productId}`)
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
