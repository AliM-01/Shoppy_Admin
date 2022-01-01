import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IResponse } from '@app_models/common/IResponse';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';
import { CreateProductModel, CreateProductResponseModel, EditProductModel, ExistsProductIdResponseModel, FilterProductModel } from '@app_models/shop/product/_index';

@Injectable({
  providedIn: 'platform'
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
        .set('CategoryId', filter.categoryId.toString() === '' ? '0' : filter.categoryId.toString())
        .set('PageId', filter.pageId.toString())
        .set('TakePage', filter.takePage.toString())
        .set('SortCreationDateOrder', filter.sortCreationDateOrder)
        .set('SortIdOrder', filter.sortIdOrder);
    }

    return this.http.get<IResponse<FilterProductModel>>(`${environment.shopBaseApiUrl}/product/filter`, { params });
  }

  existsProductId(id: number): Observable<IResponse<ExistsProductIdResponseModel>> {
    return this.http.get<IResponse<ExistsProductIdResponseModel>>(`${environment.shopBaseApiUrl}/product/exists/${id}`);
  }

  getProductDetails(id: number): Observable<IResponse<EditProductModel>> {
    return this.http.get<IResponse<EditProductModel>>(`${environment.shopBaseApiUrl}/product/${id}`);
  }

  createProduct(createData: CreateProductModel):Observable<IResponse<CreateProductResponseModel>> {
    const formData = new FormData();

    formData.append('categoryId', createData.categoryId.toString());
    formData.append('title', createData.title);
    formData.append('shortDescription', createData.shortDescription);
    formData.append('description', createData.description);
    formData.append('imageFile', createData.imageFile, createData.imageFile.name);
    formData.append('imageAlt', createData.imageAlt);
    formData.append('imageTitle', createData.imageTitle);
    formData.append('metaKeywords', createData.metaKeywords);
    formData.append('metaDescription', createData.metaDescription);
    
    return this.http.post<IResponse<CreateProductResponseModel>>(`${environment.shopBaseApiUrl}/product/create`, formData);
  }

  editProduct(editData: EditProductModel):Observable<IResponse<any>> {
    
    const formData = new FormData();
    
    formData.append('id', editData.id.toString());
    formData.append('categoryId', editData.categoryId.toString());
    formData.append('title', editData.title);
    formData.append('shortDescription', editData.shortDescription);
    formData.append('description', editData.description);

    if(editData.imageFileUploaded){
      formData.append('imageFile', editData.imageFile, editData.imageFile.name);
    }

    formData.append('imageAlt', editData.imageAlt);
    formData.append('imageTitle', editData.imageTitle);
    formData.append('metaKeywords', editData.metaKeywords);
    formData.append('metaDescription', editData.metaDescription);
    
    return this.http.put<IResponse<any>>(`${environment.shopBaseApiUrl}/product/edit`, formData);
  }

  deleteProduct(productId: number):Observable<IResponse<any>> {
    return this.http.delete<IResponse<any>>(`${environment.shopBaseApiUrl}/product/delete/${productId}`);
  }
}