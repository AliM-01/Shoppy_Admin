import { Component, OnInit } from '@angular/core';
import { AuthService } from '@app_services/auth/auth.service';
import { AccountModel } from '../../_models/account/account';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  avatarPath: string = "/assets/img/logo.png";

  private currentUserSubject: BehaviorSubject<AccountModel> =
    new BehaviorSubject<AccountModel>(new AccountModel("", [], "ادمین ادمینی", "@", "logo.png", ""))
  currentUser$: Observable<AccountModel> = this.currentUserSubject.asObservable();

  constructor(
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authService.getCurrentUser()
      .subscribe(res => {
        this.currentUserSubject.next(res)
        this.avatarPath = `${environment.avatarBaseImagePath}/${res.avatarPath}`
      }, () => this.avatarPath = "/assets/img/logo.png")
  }

}
