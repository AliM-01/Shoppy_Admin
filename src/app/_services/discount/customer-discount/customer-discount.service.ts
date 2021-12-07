import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IResponse } from '@app/_models/common/IResponse';
import { environment } from '@environments/environment';
import { DefineCustomerDiscountModel, EditCustomerDiscountModel, FilterCustomerDiscountModel } from '@app_models/discount/customer-discount/_index';

@Injectable({
  providedIn: 'platform'
})
export class CustomerDiscountService {
  constructor(
    private http: HttpClient
  ) { }


  filterCustomerDiscount(filter: FilterCustomerDiscountModel): Observable<IResponse<FilterCustomerDiscountModel>> {

    let params;

    if (filter !== null) {
      params = new HttpParams()
        .set('productId', filter.productId.toString())
        .set('productTitle', filter.productTitle);
    }

    return this.http.get<IResponse<FilterCustomerDiscountModel>>(`${environment.discountBaseApiUrl}/customer-discount/filter-discounts`, { params });
  }

  getCustomerDiscountDetails(id: number): Observable<IResponse<EditCustomerDiscountModel>> {
    return this.http.get<IResponse<EditCustomerDiscountModel>>(`${environment.discountBaseApiUrl}/customer-discount/${id}`);
  }

  defineCustomerDiscount(createData: DefineCustomerDiscountModel):Observable<IResponse<any>> {
    
    const formData = new FormData();
    
    formData.append('rate', createData.rate.toString());
    formData.append('productId', createData.productId.toString());
    formData.append('startDate', createData.startDate);
    formData.append('endDate', createData.endDate);
    formData.append('description', createData.description);
    
    return this.http.post<IResponse<any>>(`${environment.discountBaseApiUrl}/customer-discount/define-customer-discount`, formData);
  }

  editCustomerDiscount(editData: EditCustomerDiscountModel):Observable<IResponse<any>> {
    const formData = new FormData();

    formData.append('id', editData.id.toString());
    formData.append('productId', editData.productId.toString());
    formData.append('rate', editData.rate.toString());
    formData.append('startDate', editData.startDate);
    formData.append('endDate', editData.endDate);
    formData.append('description', editData.description);
    
    return this.http.put<IResponse<any>>(`${environment.discountBaseApiUrl}/customer-discount/edit-customer-discount`, formData);
  }

  deleteCustomerDiscount(CustomerDiscountId: number):Observable<IResponse<any>> {
    return this.http.delete<IResponse<any>>(`${environment.discountBaseApiUrl}/customer-discount/delete-customer-discount/${CustomerDiscountId}`);
  }

  checkProductHasCustomerDiscount(productId: number):Observable<IResponse<any>> {
    return this.http.get<IResponse<any>>(`${environment.discountBaseApiUrl}/customer-discount/check-product-has-customer-discount/${productId}`);
  }

}