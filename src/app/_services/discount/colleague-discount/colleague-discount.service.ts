import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IResponse } from '@app/_models/common/IResponse';
import { environment } from '@environments/environment';
import { CheckProductHasColleagueDiscountResponseModel, DefineColleagueDiscountModel, EditColleagueDiscountModel, FilterColleagueDiscountModel } from '@app_models/discount/colleague-discount/_index';

@Injectable({
  providedIn: 'platform'
})
export class ColleagueDiscountService {
  constructor(
    private http: HttpClient
  ) { }


  filterColleagueDiscount(filter: FilterColleagueDiscountModel): Observable<IResponse<FilterColleagueDiscountModel>> {

    let params;

    if (filter !== null) {
      params = new HttpParams()
        .set('productId', filter.productId.toString())
        .set('productTitle', filter.productTitle);
    }

    return this.http.get<IResponse<FilterColleagueDiscountModel>>(`${environment.discountBaseApiUrl}/colleague-discount/filter`, { params });
  }

  getColleagueDiscountDetails(id: number): Observable<IResponse<EditColleagueDiscountModel>> {
    return this.http.get<IResponse<EditColleagueDiscountModel>>(`${environment.discountBaseApiUrl}/colleague-discount/${id}`);
  }

  defineColleagueDiscount(createData: DefineColleagueDiscountModel):Observable<IResponse<any>> {
    
    const formData = new FormData();
    
    formData.append('rate', createData.rate.toString());
    formData.append('productId', createData.productId.toString());
    
    return this.http.post<IResponse<any>>(`${environment.discountBaseApiUrl}/colleague-discount/define`, formData);
  }

  editColleagueDiscount(editData: EditColleagueDiscountModel):Observable<IResponse<any>> {
    const formData = new FormData();

    formData.append('id', editData.id.toString());
    formData.append('productId', editData.productId.toString());
    formData.append('rate', editData.rate.toString());
    
    return this.http.put<IResponse<any>>(`${environment.discountBaseApiUrl}/colleague-discount/edit`, formData);
  }

  removeColleagueDiscount(ColleagueDiscountId: number):Observable<IResponse<any>> {
    return this.http.delete<IResponse<any>>(`${environment.discountBaseApiUrl}/colleague-discount/remove/${ColleagueDiscountId}`);
  }

  restoreColleagueDiscount(ColleagueDiscountId: number):Observable<IResponse<any>> {
    return this.http.put<IResponse<any>>(`${environment.discountBaseApiUrl}/colleague-discount/restore/${ColleagueDiscountId}`, null);
  }

  deleteColleagueDiscount(ColleagueDiscountId: number):Observable<IResponse<any>> {
    return this.http.delete<IResponse<any>>(`${environment.discountBaseApiUrl}/colleague-discount/delete/${ColleagueDiscountId}`);
  }

  checkProductHasColleagueDiscount(productId: number):Observable<IResponse<CheckProductHasColleagueDiscountResponseModel>> {
    return this.http.get<IResponse<CheckProductHasColleagueDiscountResponseModel>>(`${environment.discountBaseApiUrl}/colleague-discount/check-product-has-discount/${productId}`);
  }

}