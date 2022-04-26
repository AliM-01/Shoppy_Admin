import {Component, OnInit, AfterViewInit} from '@angular/core';
import {AuthService} from '@app_services/auth/auth.service';
import {AccountModel} from '../../_models/account/account';
import {Observable, BehaviorSubject} from 'rxjs';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, AfterViewInit {

  private avatarPathSubject: BehaviorSubject<string> = new BehaviorSubject<string>("/assets/img/logo.png");
  avatarPath$: Observable<string> = this.avatarPathSubject.asObservable();

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
        this.avatarPathSubject.next(`${environment.avatarBaseImagePath}/60/${res.avatarPath}`);
      });
  }

  ngAfterViewInit(): void {
    const toggleBtn: HTMLElement = document.getElementById("toggle-btn");
    const navbarBrandSmall: HTMLElement = document.querySelector(".navbar-header .brand-small");
    const navbarBrandBig: HTMLElement = document.querySelector(".navbar-header .brand-big");

    toggleBtn.addEventListener("click", (e) => {
      console.log("addEventListener click");
      e.preventDefault();
      toggleBtn.classList.toggle("active");

      document.querySelector(".side-navbar").classList.toggle("shrinked");
      document.querySelector(".content-inner").classList.toggle("active");

      if (window.outerWidth > 1183) {

        if (toggleBtn.classList.contains("active")) {
          navbarBrandSmall.style.display = 'none';
          navbarBrandBig.style.display = 'block';
        } else {
          navbarBrandSmall.style.display = 'block';
          navbarBrandBig.style.display = 'none';
        }
      }

      if (window.outerWidth < 1183) {
        navbarBrandSmall.style.display = 'block';
      }

    });
  }

}
