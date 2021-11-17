import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IResponse } from 'src/app/_models/common/IResponse';
import { environment } from '@environments/environment';
import { FilterProductPictureModel, EditProductPictureModel, CreateProductPictureModel } from '@app_models/product-picture/_index';
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

  getProductPictureDetails(id: number): Observable<IResponse<EditProductPictureModel>> {
    return this.http.get<IResponse<EditProductPictureModel>>(`${environment.apiUrl}/product-picture/${id}`);
  }

  createProductPicture(createData: CreateProductPictureModel):Observable<IResponse<any>> {
    
    const formData = new FormData();
    
    formData.append('productId', createData.productId.toString());
    formData.append('imageFile', createData.imageFile, createData.imageFile.name);
    formData.append('imageAlt', createData.imageAlt);
    formData.append('imageTitle', createData.imageTitle);
    
    return this.http.post<IResponse<any>>(`${environment.apiUrl}/product-Picture/create-product-Picture`, formData);
  }
}