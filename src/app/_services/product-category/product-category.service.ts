import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IResponse } from 'src/app/_models/common/IResponse';
import { environment } from '@environments/environment';
import { CreateProductCategoryModel, EditProductCategoryModel, FilterProductCategoryModel } from '@app_models/product-category/_index';

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

  getProductCategoryDetails(id: number): Observable<IResponse<EditProductCategoryModel>> {
    return this.http.get<IResponse<EditProductCategoryModel>>(`${environment.apiUrl}/product-category/${id}`);
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

  editProductCategory(editData: EditProductCategoryModel):Observable<IResponse<any>> {
    
    const formData = new FormData();

    formData.append('id', editData.id.toString());
    formData.append('title', editData.title);
    formData.append('description', editData.description);

    if(editData.imageFile !== null || editData.imageFile !== undefined){
      formData.append('imageFile', editData.imageFile, editData.imageFile.name);
    }

    formData.append('imageAlt', editData.imageAlt);
    formData.append('imageTitle', editData.imageTitle);
    formData.append('metaKeywords', editData.metaKeywords);
    formData.append('metaDescription', editData.metaDescription);
    
    return this.http.put<IResponse<any>>(`${environment.apiUrl}/product-category/edit-product-category`, formData);
  }

  deleteProductCategory(productCategoryId: number):Observable<IResponse<any>> {
    
    return this.http.delete<IResponse<any>>(`${environment.apiUrl}/product-category/delete-product-category/${productCategoryId}`);
  }

}