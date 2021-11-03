import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IResponse } from 'src/app/_models/common/IResponse';
import { environment } from '@environments/environment';
import { FilterProductCategory } from '@app_models/product-category/_index';

@Injectable({
  providedIn: 'root'
})
export class ProductCategoryService {
  constructor(
    private http: HttpClient
  ) { }


  filterProductCategory(filter: FilterProductCategory): Observable<IResponse<FilterProductCategory>> {

    let params;

    if (filter !== null) {
      params = new HttpParams()
        .set('Title', filter.title)
    }

    return this.http.get<IResponse<FilterProductCategory>>(`${environment.apiUrl}/product-category/filter-product-categories`, { params });
  }
}