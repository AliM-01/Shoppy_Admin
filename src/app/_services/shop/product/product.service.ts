import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IResponse } from '@app_models/_common/IResponse';
import { environment } from '@environments/environment';
import { Observable, throwError } from 'rxjs';
import { CreateProductModel, CreateProductResponseModel, EditProductModel, ExistsProductIdResponseModel, FilterProductModel } from '@app_models/shop/product/_index';
import { ToastrService } from 'ngx-toastr';
import { LoadingService } from '@loading';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'platform'
})
export class ProductService {
  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private loading: LoadingService,
  ) { }

  filterProduct(filter: FilterProductModel): Observable<IResponse<FilterProductModel>> {

    this.loading.loadingOn();

    let params;

    if (filter !== null) {
      params = new HttpParams()
        .set('Search', filter.search)
        .set('CategoryId', filter.categoryId.toString() === '' ? '0' : filter.categoryId.toString())
        .set('PageId', filter.pageId.toString())
        .set('TakePage', filter.takePage.toString())
        .set('SortCreationDateOrder', filter.sortCreationDateOrder)
        .set('SortIdOrder', filter.sortIdOrder);
    }

    return this.http.get<IResponse<FilterProductModel>>
    (`${environment.shopBaseApiUrl}/product/filter`, { params })
    .pipe(
      tap(() => this.loading.loadingOff()),
      catchError((error: HttpErrorResponse) => {

        this.toastr.error(error.error.message, 'خطا', { timeOut: 2500 });
        this.loading.loadingOff();

        return throwError(error);
      })
    );
  }

  existsProductId(id: number): Observable<IResponse<ExistsProductIdResponseModel>> {
    this.loading.loadingOn();

    return this.http.get<IResponse<ExistsProductIdResponseModel>>
    (`${environment.shopBaseApiUrl}/product/exists/${id}`)
    .pipe(
      tap((res :IResponse<ExistsProductIdResponseModel>) => {
        if (res.data.exists === false) {
          this.toastr.error("محصولی با این شناسه وجود ندارد", "خطا", { timeOut: 500 });
        }
        this.loading.loadingOff();

      }),
      catchError((error: HttpErrorResponse) => {
        this.toastr.error(error.error.message, 'خطا', { timeOut: 2500 });
        this.loading.loadingOff();

        return throwError(error);
      })
    );
  }

  getProductDetails(id: number): Observable<IResponse<EditProductModel>> {

    this.loading.loadingOn();

    return this.http.get<IResponse<EditProductModel>>
    (`${environment.shopBaseApiUrl}/product/${id}`)
    .pipe(
      tap(() => this.loading.loadingOff()),
      catchError((error: HttpErrorResponse) => {

        this.toastr.error(error.error.message, 'خطا', { timeOut: 2500 });
        this.loading.loadingOff();

        return throwError(error);
      })
    );
  }

  createProduct(createData: CreateProductModel):Observable<IResponse<CreateProductResponseModel>> {
    this.loading.loadingOn();

    const formData = new FormData();

    formData.append('categoryId', createData.categoryId.toString());
    formData.append('title', createData.title);
    formData.append('shortDescription', createData.shortDescription);
    formData.append('description', createData.description);
    formData.append('imageFile', createData.imageFile, createData.imageFile.name);
    formData.append('imageAlt', createData.imageAlt);
    formData.append('imageTitle', createData.imageTitle);
    formData.append('metaKeywords', createData.metaKeywords);
    formData.append('metaDescription', createData.metaDescription);
    
    return this.http.post<IResponse<CreateProductResponseModel>>
    (`${environment.shopBaseApiUrl}/product/create`, formData)
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

  editProduct(editData: EditProductModel):Observable<IResponse<any>> {
    
    const formData = new FormData();
    
    formData.append('id', editData.id.toString());
    formData.append('categoryId', editData.categoryId.toString());
    formData.append('title', editData.title);
    formData.append('shortDescription', editData.shortDescription);
    formData.append('description', editData.description);

    if(editData.imageFileUploaded){
      formData.append('imageFile', editData.imageFile, editData.imageFile.name);
    }

    formData.append('imageAlt', editData.imageAlt);
    formData.append('imageTitle', editData.imageTitle);
    formData.append('metaKeywords', editData.metaKeywords);
    formData.append('metaDescription', editData.metaDescription);
    
    return this.http.put<IResponse<any>>
    (`${environment.shopBaseApiUrl}/product/edit`, formData)
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

  deleteProduct(productId: number):Observable<IResponse<any>> {
    return this.http.delete<IResponse<any>>
    (`${environment.shopBaseApiUrl}/product/delete/${productId}`)
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