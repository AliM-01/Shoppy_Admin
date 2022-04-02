import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IResponse } from '@app_models/_common/IResponse';
import { environment } from '@environments/environment';
import { tap, catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { LoadingService } from '@loading-service';
import { ArticleCategoryForSelectListModel, CreateArticleCategoryModel, EditArticleCategoryModel, FilterArticleCategoryModel } from '@app_models/blog/article-category/_index';

@Injectable({
  providedIn: 'platform'
})
export class ArticleCategoryService {
  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private loading: LoadingService,
  ) { }

  getArticleCategoriesSelectList(): Observable<IResponse<ArticleCategoryForSelectListModel[]>> {

    this.loading.loadingOn();

    return this.http.get<IResponse<ArticleCategoryForSelectListModel[]>>
    (`${environment.blogBaseApiUrl}/article-category/get-select-list`)
    .pipe(
      tap(() => this.loading.loadingOff()),
      catchError((error: HttpErrorResponse) => {

        this.toastr.error(error.error.message, 'خطا', { timeOut: 2500 });
        this.loading.loadingOff();

        return throwError(error);
      })
    );
  }

  filterArticleCategory(filter: FilterArticleCategoryModel): Observable<IResponse<FilterArticleCategoryModel>> {

    this.loading.loadingOn();

    let params = new HttpParams();

    if (filter.title) {
      params.set('Title', filter.title)
    }

    return this.http.get<IResponse<FilterArticleCategoryModel>>
    (`${environment.blogBaseApiUrl}/article-category/filter`, { params })
    .pipe(
      tap(() => this.loading.loadingOff()),
      catchError((error: HttpErrorResponse) => {

        this.toastr.error(error.error.message, 'خطا', { timeOut: 2500 });
        this.loading.loadingOff();

        return throwError(error);
      })
    );
  }

  getArticleCategoryDetails(id: string): Observable<IResponse<EditArticleCategoryModel>> {

    this.loading.loadingOn();

    return this.http.get<IResponse<EditArticleCategoryModel>>
    (`${environment.blogBaseApiUrl}/article-category/${id}`)
    .pipe(
      tap(() => this.loading.loadingOff()),
      catchError((error: HttpErrorResponse) => {

        this.toastr.error(error.error.message, 'خطا', { timeOut: 2500 });
        this.loading.loadingOff();

        return throwError(error);
      })
    );
  }

  createArticleCategory(createData: CreateArticleCategoryModel):Observable<IResponse<any>> {

    this.loading.loadingOn();

    const formData = new FormData();

    formData.append('title', createData.title);
    formData.append('description', createData.description);
    formData.append('orderShow', createData.orderShow.toString());
    formData.append('imageFile', createData.imageFile, createData.imageFile.name);
    formData.append('imageAlt', createData.imageAlt);
    formData.append('imageTitle', createData.imageTitle);
    formData.append('metaKeywords', createData.metaKeywords);
    formData.append('metaDescription', createData.metaDescription);

    return this.http.post<IResponse<any>>
    (`${environment.blogBaseApiUrl}/article-category/create`, formData)
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

  editArticleCategory(editData: EditArticleCategoryModel):Observable<IResponse<any>> {

    this.loading.loadingOn();

    const formData = new FormData();

    formData.append('id', editData.id);
    formData.append('title', editData.title);
    formData.append('orderShow', editData.orderShow.toString());
    formData.append('description', editData.description);

    if(editData.imageFileUploaded){
      formData.append('imageFile', editData.imageFile, editData.imageFile.name);
    }

    formData.append('imageAlt', editData.imageAlt);
    formData.append('imageTitle', editData.imageTitle);
    formData.append('metaKeywords', editData.metaKeywords);
    formData.append('metaDescription', editData.metaDescription);

    return this.http.put<IResponse<any>>
    (`${environment.blogBaseApiUrl}/article-category/edit`, formData)
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

  deleteArticleCategory(id: string):Observable<IResponse<any>> {
    this.loading.loadingOn();

    return this.http.delete<IResponse<any>>
    (`${environment.blogBaseApiUrl}/article-category/delete/${id}`)
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
