import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IResponse } from '@app_models/_common/IResponse';
import { environment } from '@environments/environment';
import { tap, catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { LoadingService } from '@loading';
import { CreateArticleModel, EditArticleModel, FilterArticleModel } from '@app_models/blog/article/_index';

@Injectable({
  providedIn: 'platform'
})
export class ArticleService {
  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private loading: LoadingService,
  ) { }
  
  filterArticle(filter: FilterArticleModel): Observable<IResponse<FilterArticleModel>> {
    
    this.loading.loadingOn();

    let params;

    if (filter !== null) {
      params = new HttpParams()
        .set('Title', filter.title)
    }

    return this.http.get<IResponse<FilterArticleModel>>
    (`${environment.blogBaseApiUrl}/article/filter`, { params })
    .pipe(
      tap(() => this.loading.loadingOff()),
      catchError((error: HttpErrorResponse) => {

        this.toastr.error(error.error.message, 'خطا', { timeOut: 2500 });
        this.loading.loadingOff();

        return throwError(error);
      })
    );
  }

  getArticleDetails(id: number): Observable<IResponse<EditArticleModel>> {

    this.loading.loadingOn();

    return this.http.get<IResponse<EditArticleModel>>
    (`${environment.blogBaseApiUrl}/article/${id}`)
    .pipe(
      tap(() => this.loading.loadingOff()),
      catchError((error: HttpErrorResponse) => {

        this.toastr.error(error.error.message, 'خطا', { timeOut: 2500 });
        this.loading.loadingOff();

        return throwError(error);
      })
    );
  }

  createArticle(createData: CreateArticleModel):Observable<IResponse<any>> {

    this.loading.loadingOn();

    const formData = new FormData();
    
    formData.append('title', createData.title);
    formData.append('summary', createData.summary);
    formData.append('text', createData.text);
    formData.append('imageFile', createData.imageFile, createData.imageFile.name);
    formData.append('imageAlt', createData.imageAlt);
    formData.append('imageTitle', createData.imageTitle);
    formData.append('metaKeywords', createData.metaKeywords);
    formData.append('metaDescription', createData.metaDescription);
    
    return this.http.post<IResponse<any>>
    (`${environment.blogBaseApiUrl}/article/create`, formData)
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

  editArticle(editData: EditArticleModel):Observable<IResponse<any>> {
    
    this.loading.loadingOn();

    const formData = new FormData();

    formData.append('id', editData.id.toString());
    formData.append('title', editData.title);
    formData.append('summary', editData.summary);
    formData.append('text', editData.text);

    if(editData.imageFileUploaded){
      formData.append('imageFile', editData.imageFile, editData.imageFile.name);
    }

    formData.append('imageAlt', editData.imageAlt);
    formData.append('imageTitle', editData.imageTitle);
    formData.append('metaKeywords', editData.metaKeywords);
    formData.append('metaDescription', editData.metaDescription);
    
    return this.http.put<IResponse<any>>
    (`${environment.blogBaseApiUrl}/article/edit`, formData)
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

  deleteArticle(articleId: number):Observable<IResponse<any>> {
    this.loading.loadingOn();

    return this.http.delete<IResponse<any>>
    (`${environment.blogBaseApiUrl}/article/delete/${articleId}`)
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