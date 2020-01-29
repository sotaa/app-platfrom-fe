import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { IAuthResult } from './models';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { intersection } from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authResult: IAuthResult;
  constructor(private http: HttpClient) {}

  /**
   * Performs login action.
   * @param username Username (email)
   * @param password Password
   */
  login(username: string, password: string) {
    return this.http
      .post<IAuthResult>(environment.identityUrls.login, { username, password })
      .pipe(tap(res => this.setAuthResult(res)));
  }

  /**
   * Performs register action.
   * @param username Username (email)
   * @param password Password
   */
  register(username: string, password: string) {
    return this.http
      .post<IAuthResult>(environment.identityUrls.register, {
        username,
        password
      })
      .pipe(tap(res => this.setAuthResult(res)));
  }

  logout() {
    localStorage.clear();
  }

  getCurrentUser(): Observable<IAuthResult> {
   
    return new Observable(observer => { const localUserStr =
      this.authResult ||
      sessionStorage.getItem('authResult') ||
      sessionStorage.getItem('authResult');

    if (!localUserStr) {
       observer.next(null);
       return;
    }

    if (typeof localUserStr === 'string') {
      this.authResult = JSON.parse(localUserStr);
    }

     observer.next(this.authResult.user);
    }) 
      
  }

  private setAuthResult(user: IAuthResult) {
    this.authResult = user;
    sessionStorage.setItem('authResult', JSON.stringify(user));
  }

  rememberCurrentUser() {
    localStorage.setItem('authResult', JSON.stringify(this.authResult));
  }

  hasPermission(requiredPermissions: string[]): boolean{
    if (!this.authResult) {
     return false;
    }

    if (!requiredPermissions || !requiredPermissions.length) return true;

    /** برای این که ببینیم کاربر همه دسترسی ها رو داره مشترکات بین دسترسی های لازم
     * و دسترسی های کاربر رو بدست میاریم اگر مشترکات با دسترسی های لازم برابر بود
     * پس کاربر همه دسترسی های لازم رو داره
     */
    const userPermissions = this.authResult.user.role.permissions;

    if (requiredPermissions.length > userPermissions.length) return false;

    return intersection(userPermissions, requiredPermissions).length === requiredPermissions.length;
  }
}
