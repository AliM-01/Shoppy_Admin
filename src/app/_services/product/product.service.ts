import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IResponse } from '@app_models/common/IResponse';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';
import { CreateProductModel, EditProductModel, FilterProductModel } from '../../_models/product/_index';

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

  
  createProduct(createData: CreateProductModel):Observable<IResponse<any>> {
    
    const formData = new FormData();

    formData.append('categoryId', createData.categoryId.toString());
    formData.append('title', createData.title);
    formData.append('code', createData.code);
    formData.append('unitPrice', createData.unitPrice);
    formData.append('isInStock', createData.isInStock.valueOf.toString());
    formData.append('shortDescription', createData.shortDescription);
    formData.append('description', createData.description);
    formData.append('imageFile', createData.imageFile, createData.imageFile.name);
    formData.append('imageAlt', createData.imageAlt);
    formData.append('imageTitle', createData.imageTitle);
    formData.append('metaKeywords', createData.metaKeywords);
    formData.append('metaDescription', createData.metaDescription);
    
    return this.http.post<IResponse<any>>(`${environment.apiUrl}/product-/create-product`, formData);
  }
}