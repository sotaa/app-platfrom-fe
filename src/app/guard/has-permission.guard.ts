import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  CanActivateChild,
  Router
} from '@angular/router';
import { Observable } from 'rxjs';
import { RoutePermissions } from './permissions';
import { AuthService } from '../auth/auth.service';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HasPermissionGuard implements CanActivateChild, CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.canActivateChild(next, state)
  }
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const config = RoutePermissions.find(item => item.path === next.url.toString());

    if(!config) return true;
    
    return this.authService.hasPermission(config.claims).pipe(map(hasPermission => hasPermission ? true : this.router.parseUrl(environment.permissionDeniedPageUrl))) ;
  }
}
