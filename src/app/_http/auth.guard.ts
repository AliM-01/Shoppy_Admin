import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from "@angular/router";
import { AuthService } from "@app_services/auth/auth.service";
import { Observable } from "rxjs";
import { AuthGuardPermission } from '../_models/auth/auth-guard-permission';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {

  constructor(private authService: AuthService, private router: Router) { }
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const permissionData = route.data["permission"] as AuthGuardPermission;
    console.log('guard ', permissionData);

    return this.checkAuth(permissionData, state.url);
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const permissionData = childRoute.data["permission"] as AuthGuardPermission;
    console.log('guard ', permissionData);
    
    return this.checkAuth(permissionData, state.url);
  }

  canLoad(route: Route, segments: UrlSegment[]): boolean {
    if (route.data) {
      const permissionData = route.data["permission"] as AuthGuardPermission;
      const returnUrl = `/${route.path}`;

      return this.checkAuth(permissionData, returnUrl);
    } else {
      return false;
    }
  }
  
  private checkAuth(permissionData: any, returnUrl: string): boolean {

    let hasAccess: boolean = false;
    let isLoggedIn: boolean = false;

    this.authService.isAuthUserLoggedIn()
      .subscribe(res => isLoggedIn = res);

    if (!isLoggedIn) {
      this.showAccessDenied(returnUrl);
      hasAccess = false;
    } else {
      hasAccess = true;
    }

    if (!permissionData) {
      hasAccess = true;
    }

    if (Array.isArray(permissionData.deniedRoles) && Array.isArray(permissionData.permittedRoles)) {
      throw new Error("Don't set both 'deniedRoles' and 'permittedRoles' in route data.");
    }

    if (Array.isArray(permissionData.permittedRoles)) {
      const isInRole = this.authService.isAuthUserInRoles(permissionData.permittedRoles);
      console.log('guard isInRole ', isInRole);

      if (isInRole) {
        hasAccess = true;
      } else {
        this.showAccessDenied(returnUrl);
        hasAccess = false;
      }

      
    }

    if (Array.isArray(permissionData.deniedRoles)) {
      const isInRole = this.authService.isAuthUserInRoles(permissionData.deniedRoles);
      if (!isInRole) {
        hasAccess = true;
      } else {
        this.showAccessDenied(returnUrl);
        hasAccess = false;
      }
    }

    console.log('final', isLoggedIn);
    
    return isLoggedIn;
  }

  private showAccessDenied(returnUrl: string) {
    this.router.navigate(["/auth/access-denied"], { queryParams: { returnUrl: returnUrl } });
  }
}
