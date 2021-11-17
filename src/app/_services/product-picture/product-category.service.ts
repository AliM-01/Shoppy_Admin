import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IResponse } from 'src/app/_models/common/IResponse';
import { environment } from '@environments/environment';
import { FilterProductPictureModel } from '@app_models/product-picture/filter-product-picture';
@Injectable({
  providedIn: 'root'
})
export class ProductPictureService {
  constructor(
    private http: HttpClient
  ) { }


  filterProductPictures(filter: FilterProductPictureModel): Observable<IResponse<FilterProductPictureModel>> {

    let params;

    if (filter !== null) {
      params = new HttpParams()
      .set('ProductId', (filter.productId == '' ? 0 : parseInt(filter.productId)));

    }

    return this.http.get<IResponse<FilterProductPictureModel>>(`${environment.apiUrl}/product-picture/filter-product-pictures`, { params });
  }

}