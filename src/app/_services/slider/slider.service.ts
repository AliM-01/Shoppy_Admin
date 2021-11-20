import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IResponse } from '@app_models/common/IResponse';
import { SliderModel, EditSliderModel, CreateSliderModel } from '@app_models/slider/_index';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SliderService {
  constructor(
    private http: HttpClient
  ) { }

  getSlidersList(): Observable<IResponse<SliderModel[]>> {
    return this.http.get<IResponse<SliderModel[]>>(`${environment.apiUrl}/slider/get-list`);
  }

  getSliderDetails(id: number): Observable<IResponse<EditSliderModel>> {
    return this.http.get<IResponse<EditSliderModel>>(`${environment.apiUrl}/slider/${id}`);
  }

  createSlider(createData: CreateSliderModel):Observable<IResponse<any>> {
    
    const formData = new FormData();
    
    formData.append('heading', createData.heading);
    formData.append('text', createData.text);
    formData.append('imageFile', createData.imageFile, createData.imageFile.name);
    formData.append('imageAlt', createData.imageAlt);
    formData.append('imageTitle', createData.imageTitle);
    formData.append('btnLink', createData.btnLink);
    formData.append('btnText', createData.btnText);
    
    return this.http.post<IResponse<any>>(`${environment.apiUrl}/slider/create-slider`, formData);
  }
}