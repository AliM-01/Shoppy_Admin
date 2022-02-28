import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { LoadingService } from '@loading';

@Injectable({
  providedIn: 'platform'
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private loading: LoadingService,
  ) { }


}