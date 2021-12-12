import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IResponse } from '@app_models/common/IResponse';
import { CreateInventoryModel, EditInventoryModel, FilterInventoryModel, IncreaseInventoryModel, ReduceInventoryModel } from '@app_models/inventory/_index';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'platform'
})
export class InventoryService {
  constructor(
    private http: HttpClient
  ) { }

  filterInventory(filter: FilterInventoryModel): Observable<IResponse<FilterInventoryModel>> {

    let params;

    if (filter !== null) {
      params = new HttpParams()
        .set('productId', filter.productId.toString())
        .set('inStock', (filter.inStock === true ? 'true' : 'false'));
    }

    return this.http.get<IResponse<FilterInventoryModel>>(`${environment.inventoryBaseApiUrl}/filter`, { params });
  }

  getInventoryDetails(id: number): Observable<IResponse<EditInventoryModel>> {
    return this.http.get<IResponse<EditInventoryModel>>(`${environment.inventoryBaseApiUrl}/${id}`);
  }

  createInventory(createData: CreateInventoryModel):Observable<IResponse<any>> {
    
    const formData = new FormData();
    
    formData.append('unitPrice', createData.unitPrice.toString());
    formData.append('productId', createData.productId.toString());
    
    return this.http.post<IResponse<any>>(`${environment.inventoryBaseApiUrl}/create`, formData);
  }

  editInventory(editData: EditInventoryModel):Observable<IResponse<any>> {
    
    const formData = new FormData();
    
    formData.append('id', editData.id.toString());
    formData.append('unitPrice', editData.unitPrice.toString());
    formData.append('productId', editData.productId.toString());
    
    return this.http.put<IResponse<any>>(`${environment.inventoryBaseApiUrl}/edit`, formData);
  }

  increaseInventory(increaseData: IncreaseInventoryModel):Observable<IResponse<any>> {
    
    const formData = new FormData();
    
    formData.append('inventoryId', increaseData.inventoryId.toString());
    formData.append('count', increaseData.count.toString());
    formData.append('description', increaseData.description.toString());
    
    return this.http.post<IResponse<any>>(`${environment.inventoryBaseApiUrl}/increase`, formData);
  }

  reduceInventory(reduceData: ReduceInventoryModel):Observable<IResponse<any>> {
    
    const formData = new FormData();
    
    formData.append('inventoryId', reduceData.inventoryId.toString());
    formData.append('orderId', reduceData.orderId.toString());
    formData.append('productId', reduceData.productId.toString());
    formData.append('count', reduceData.count.toString());
    formData.append('description', reduceData.description.toString());
    
    return this.http.post<IResponse<any>>(`${environment.inventoryBaseApiUrl}/reduce`, formData);
  }
}