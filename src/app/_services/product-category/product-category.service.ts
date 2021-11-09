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
    
    const formData = new FormData();

    formData.append('title', createData.title);
    formData.append('description', createData.description);
    formData.append('imageFile', createData.imageFile, createData.imageFile.name);
    formData.append('imageAlt', createData.imageAlt);
    formData.append('imageTitle', createData.imageTitle);
    formData.append('metaKeywords', createData.metaKeywords);
    formData.append('metaDescription', createData.metaDescription);
    
    return this.http.post<IResponse<any>>(`${environment.apiUrl}/product-category/create-product-category`, formData);
  }


  deleteProductCategory(productCategoryId: number):Observable<IResponse<any>> {
    
    return this.http.delete<IResponse<any>>(`${environment.apiUrl}/product-category/delete-product-category/${productCategoryId}`);
  }

}