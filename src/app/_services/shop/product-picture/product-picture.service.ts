import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { IResponse } from '@app_models/common/IResponse';
import { environment } from '@environments/environment';
import { CreateProductPictureModel } from '@app_models/shop/product-picture/_index';
import { ToastrService } from 'ngx-toastr';
import { LoadingService } from '@loading';
import { catchError, tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'any'
})
export class ProductPictureService {
  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private loading: LoadingService,
  ) { }


  getProductPictures(productId: number): Observable<IResponse<any>> {
    this.loading.loadingOn();

    return this.http.get<IResponse<any>>
    (`${environment.shopBaseApiUrl}/product-picture/${productId}`)
    .pipe(
      tap(() => this.loading.loadingOff()),
      catchError((error: HttpErrorResponse) => {

        this.toastr.error(error.error.message, 'خطا', { timeOut: 2500 });
        this.loading.loadingOff();

        return throwError(error);
      })
    );
  }

  createProductPicture(createData: CreateProductPictureModel):Observable<IResponse<any>> {
    this.loading.loadingOn();

    const formData = new FormData();
    
    formData.append('productId', createData.productId.toString());
console.log( createData.imageFiles);

    for (var i = 0; i < createData.imageFiles.length; i++) {
      formData.append("imageFiles", createData.imageFiles[i]);
    }
    console.log(formData.get("imageFiles"));
    
    return this.http.post<IResponse<any>>
    (`${environment.shopBaseApiUrl}/product-picture/create`, formData)
    .pipe(
      tap((res: IResponse<any>) => {

        this.toastr.success(res.message, 'موفقیت', { timeOut: 1500 });
        this.loading.loadingOff();

      }),
      catchError((error: HttpErrorResponse) => {

        this.toastr.error(error.error.message, 'خطا', { timeOut: 2500 });
        this.loading.loadingOff();

        return throwError(error);
      })
    );
  }

  removeProductPicture(productPictureId: number):Observable<IResponse<any>> {
    return this.http.delete<IResponse<any>>
    (`${environment.shopBaseApiUrl}/product-picture/remove/${productPictureId}`)
    .pipe(
      tap(() => this.loading.loadingOff()),
      catchError((error: HttpErrorResponse) => {

        this.toastr.error(error.error.message, 'خطا', { timeOut: 2500 });
        this.loading.loadingOff();

        return throwError(error);
      })
    );
  }
}