import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IResponse } from '@app_models/common/IResponse';
import { EditInventoryModel, FilterInventoryModel } from '@app_models/inventory/_index';
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

}