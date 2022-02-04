import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IResponse } from '@app_models/_common/IResponse';
import { environment } from '@environments/environment';
import { tap, catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { LoadingService } from '@loading';
import { FilterArticleCategoryModel } from '@app_models/blog/article-category/_index';

@Injectable({
  providedIn: 'platform'
})
export class ArticleCategoryService {
  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private loading: LoadingService,
  ) { }
  
  filterArticleCategory(filter: FilterArticleCategoryModel): Observable<IResponse<FilterArticleCategoryModel>> {
    
    this.loading.loadingOn();

    let params;

    if (filter !== null) {
      params = new HttpParams()
        .set('Title', filter.title)
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
}