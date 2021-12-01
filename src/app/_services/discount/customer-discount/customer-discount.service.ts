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
    }

    return this.http.get<IResponse<FilterCustomerDiscountModel>>(`${environment.shopBaseApiUrl}/customer-discount/filter-product-categories`, { params });
  }

  getCustomerDiscountDetails(id: number): Observable<IResponse<EditCustomerDiscountModel>> {
    return this.http.get<IResponse<EditCustomerDiscountModel>>(`${environment.shopBaseApiUrl}/customer-discount/${id}`);
  }

  defineCustomerDiscount(createData: DefineCustomerDiscountModel):Observable<IResponse<any>> {
    
    const formData = new FormData();
    
    formData.append('rate', createData.rate.toString());
    formData.append('description', createData.description);
    
    return this.http.post<IResponse<any>>(`${environment.shopBaseApiUrl}/customer-discount/define-customer-discount`, formData);
  }

  editCustomerDiscount(editData: EditCustomerDiscountModel):Observable<IResponse<any>> {
    const formData = new FormData();

    formData.append('id', editData.id.toString());
    formData.append('rate', editData.rate.toString());
    formData.append('description', editData.description);
    
    return this.http.put<IResponse<any>>(`${environment.shopBaseApiUrl}/customer-discount/edit-customer-discount`, formData);
  }

  deleteCustomerDiscount(CustomerDiscountId: number):Observable<IResponse<any>> {
    return this.http.delete<IResponse<any>>(`${environment.shopBaseApiUrl}/customer-discount/delete-customer-discount/${CustomerDiscountId}`);
  }

}