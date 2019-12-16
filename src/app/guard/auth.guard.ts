import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';
import { RoutePermissions } from './permissions/routes-permissions.config';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const routePermission = RoutePermissions.find(rp => rp.path === state.url);
    if (!routePermission) { return true; }

    // TODO: Check whether current user has the required permission or not.

    return true;
  }
}
