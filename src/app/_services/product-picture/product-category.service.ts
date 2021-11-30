import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IResponse } from 'src/app/_models/common/IResponse';
import { environment } from '@environments/environment';
import { CreateProductPictureModel } from '@app_models/product-picture/_index';
@Injectable({
  providedIn: 'root'
})
export class ProductPictureService {
  constructor(
    private http: HttpClient
  ) { }


  getProductPictures(productId: number): Observable<IResponse<any>> {
    return this.http.get<IResponse<any>>(`${environment.shopBaseApiUrl}/product-picture/${productId}`);
  }

  createProductPicture(createData: CreateProductPictureModel):Observable<IResponse<any>> {
    
    const formData = new FormData();
    
    formData.append('productId', createData.productId.toString());
    formData.append('imageFile', createData.imageFile, createData.imageFile.name);
    formData.append('imageAlt', createData.imageAlt);
    formData.append('imageTitle', createData.imageTitle);
    
    return this.http.post<IResponse<any>>(`${environment.shopBaseApiUrl}/product-picture/create-product-picture`, formData);
  }

  removeProductPicture(productPictureId: number):Observable<IResponse<any>> {
    return this.http.delete<IResponse<any>>(`${environment.shopBaseApiUrl}/product-picture/remove-product-picture/${productPictureId}`);
  }
}