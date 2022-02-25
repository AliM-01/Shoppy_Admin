import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { IResponse } from '@app_models/_common/IResponse';
import { environment } from '@environments/environment';
import { CreateProductCategoryModel, EditProductCategoryModel, FilterProductCategoryModel, ProductCategoryForSelectListModel }
 from '@app_models/shop/product-category/_index';
import { ToastrService } from 'ngx-toastr';
import { LoadingService } from '@loading';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'platform'
})
export class ProductCategoryService {
  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private loading: LoadingService,
  ) { }


  filterProductCategory(filter: FilterProductCategoryModel): Observable<IResponse<FilterProductCategoryModel>> {
    
    this.loading.loadingOn();

    let params;

    if (filter !== null) {
      params = new HttpParams()
        .set('Title', filter.title)
    }

    return this.http.get<IResponse<FilterProductCategoryModel>>
    (`${environment.shopBaseApiUrl}/product-category/filter`, { params })
    .pipe(
      tap(() => this.loading.loadingOff()),
      catchError((error: HttpErrorResponse) => {

        this.toastr.error(error.error.message, 'خطا', { timeOut: 2500 });
        this.loading.loadingOff();

        return throwError(error);
      })
    );
  }

  getProductCategoriesList(): Observable<IResponse<ProductCategoryForSelectListModel[]>> {
    
    this.loading.loadingOn();
    
    return this.http.get<IResponse<ProductCategoryForSelectListModel[]>>
    (`${environment.shopBaseApiUrl}/product-category/get-list`)
    .pipe(
      tap(() => this.loading.loadingOff()),
      catchError((error: HttpErrorResponse) => {

        this.toastr.error(error.error.message, 'خطا', { timeOut: 2500 });
        this.loading.loadingOff();

        return throwError(error);
      })
    );
  }

  getProductCategoryDetails(id: string): Observable<IResponse<EditProductCategoryModel>> {

    this.loading.loadingOn();

    return this.http.get<IResponse<EditProductCategoryModel>>
    (`${environment.shopBaseApiUrl}/product-category/${id}`)
    .pipe(
      tap(() => this.loading.loadingOff()),
      catchError((error: HttpErrorResponse) => {

        this.toastr.error(error.error.message, 'خطا', { timeOut: 2500 });
        this.loading.loadingOff();

        return throwError(error);
      })
    );
  }

  createProductCategory(createData: CreateProductCategoryModel):Observable<IResponse<any>> {

    this.loading.loadingOn();

    const formData = new FormData();
    
    formData.append('title', createData.title);
    formData.append('description', createData.description);
    formData.append('imageFile', createData.imageFile, createData.imageFile.name);
    formData.append('imageAlt', createData.imageAlt);
    formData.append('imageTitle', createData.imageTitle);
    formData.append('metaKeywords', createData.metaKeywords);
    formData.append('metaDescription', createData.metaDescription);
    
    return this.http.post<IResponse<any>>
    (`${environment.shopBaseApiUrl}/product-category/create`, formData)
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

  editProductCategory(editData: EditProductCategoryModel):Observable<IResponse<any>> {
    
    this.loading.loadingOn();

    const formData = new FormData();

    formData.append('id', editData.id);
    formData.append('title', editData.title);
    formData.append('description', editData.description);

    if(editData.imageFileUploaded){
      formData.append('imageFile', editData.imageFile, editData.imageFile.name);
    }

    formData.append('imageAlt', editData.imageAlt);
    formData.append('imageTitle', editData.imageTitle);
    formData.append('metaKeywords', editData.metaKeywords);
    formData.append('metaDescription', editData.metaDescription);
    
    return this.http.put<IResponse<any>>
    (`${environment.shopBaseApiUrl}/product-category/edit`, formData)
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

  deleteProductCategory(productCategoryId: string):Observable<IResponse<any>> {
    this.loading.loadingOn();

    return this.http.delete<IResponse<any>>
    (`${environment.shopBaseApiUrl}/product-category/delete/${productCategoryId}`)
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