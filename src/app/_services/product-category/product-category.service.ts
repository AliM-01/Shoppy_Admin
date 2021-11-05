import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IResponse } from 'src/app/_models/common/IResponse';
import { environment } from '@environments/environment';
import { FilterProductCategoryModel } from '@app_models/product-category/_index';
import { CreateProductCategoryModel } from '../../_models/product-category/create-product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductCategoryService {
  constructor(
    private http: HttpClient
  ) { }


  filterProductCategory(filter: FilterProductCategoryModel): Observable<IResponse<FilterProductCategoryModel>> {

    let params;

    if (filter !== null) {
      params = new HttpParams()
        .set('Title', filter.title)
    }

    return this.http.get<IResponse<FilterProductCategoryModel>>(`${environment.apiUrl}/product-category/filter-product-categories`, { params });
  }

  createProductCategory(createData: CreateProductCategoryModel):Observable<IResponse<any>> {
    return this.http.post<IResponse<any>>(`${environment.apiUrl}/product-category/create-product-category`, createData);
  }
}