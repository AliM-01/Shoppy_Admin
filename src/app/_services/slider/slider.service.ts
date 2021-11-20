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

  editSlider(editData: EditSliderModel):Observable<IResponse<any>> {
    const formData = new FormData();

    formData.append('id', editData.id.toString());
    formData.append('heading', editData.heading);
    formData.append('text', editData.text);

    if(editData.imageFileUploaded){
      formData.append('imageFile', editData.imageFile, editData.imageFile.name);
    }

    formData.append('imageAlt', editData.imageAlt);
    formData.append('imageTitle', editData.imageTitle);
    formData.append('btnLink', editData.btnLink);
    formData.append('btnText', editData.btnText);
    
    return this.http.put<IResponse<any>>(`${environment.apiUrl}/slider/edit-slider`, formData);
  }

  removeSlider(sliderId: number):Observable<IResponse<any>> {
    return this.http.delete<IResponse<any>>(`${environment.apiUrl}/slider/remove-slider/${sliderId}`);
  }

  restoreSlider(sliderId: number):Observable<IResponse<any>> {
    return this.http.delete<IResponse<any>>(`${environment.apiUrl}/slider/restore-slider/${sliderId}`);
  }
}