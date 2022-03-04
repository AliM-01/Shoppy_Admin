import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { AuthService } from "@app_services/auth/auth.service";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.authService.isAuthUserLoggedIn().toPromise().then(res => {
      if (res) {
        return true
      } else {
        this.showAccessDenied(state.url);
        return false;
      }
    }).catch(() => {
      this.showAccessDenied(state.url);
      return false;
    })
  }

  private showAccessDenied(returnUrl: string) {
    this.router.navigate(["/auth/access-denied"], { queryParams: { returnUrl: returnUrl } });
  }
}
