import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IResponse } from '@app_models/common/IResponse';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';
import { EditProductModel, FilterProductModel } from '../../_models/product/_index';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(
    private http: HttpClient
  ) { }

  filterProduct(filter: FilterProductModel): Observable<IResponse<FilterProductModel>> {

    let params;

    if (filter !== null) {
      params = new HttpParams()
        .set('Search', filter.search)
    }

    return this.http.get<IResponse<FilterProductModel>>(`${environment.apiUrl}/product/filter-product`, { params });
  }
  
  getProductDetails(id: number): Observable<IResponse<EditProductModel>> {
    return this.http.get<IResponse<EditProductModel>>(`${environment.apiUrl}/product/${id}`);
  }
}