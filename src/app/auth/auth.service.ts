import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { IAuthResult } from './models';
import { tap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { intersection } from 'lodash';
import { Store } from '@ngrx/store';
import { IAuthState } from './reducers/auth-state.interface';
import { ChangeUser } from './reducers/actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private authStore: Store<IAuthState>) {
    const savedUserData = this.getSavedAuthResult();
    if (savedUserData) {
      this.authStore.dispatch(new ChangeUser(savedUserData));
      this.rememberCurrentUser();
    }
  }

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
    return this.authStore.dispatch(new ChangeUser(undefined));
  }

  private getSavedAuthResult() {
    const localAuthResult = sessionStorage.getItem('authResult') ||
      sessionStorage.getItem('authResult');
    return localAuthResult ? JSON.parse(localAuthResult) : undefined;
  }

  // getCurrentUser(): Observable<IAuthResult> {
  //   return new Observable(observer => {
  //     const localUserStr = this.authResult ||
  //     sessionStorage.getItem('authResult') ||
  //     sessionStorage.getItem('authResult');

  //   if (!localUserStr) {
  //      observer.next(null);
  //      return;
  //   }

  //   if (typeof localUserStr === 'string') {
  //     this.authResult = JSON.parse(localUserStr);
  //   }

  //    observer.next(this.authResult.user);
  //   })
  // }

  getCurrentUser() {
    return this.authStore.select((a: any) => a.authState.authResult);
  }

  private setAuthResult(user: IAuthResult) {
    this.authStore.dispatch(new ChangeUser(user));
    sessionStorage.setItem('authResult', JSON.stringify(user));
  }

  rememberCurrentUser() {
    this.getCurrentUser().subscribe(authResult => {
      localStorage.setItem('authResult', JSON.stringify(authResult));
    });
  }

  hasPermission(requiredPermissions: string[]): Observable<boolean> {
    return this.getCurrentUser().pipe(map(authResult => {
      if (!requiredPermissions || !requiredPermissions.length) return true;

      /** برای این که ببینیم کاربر همه دسترسی ها رو داره مشترکات بین دسترسی های لازم
       * و دسترسی های کاربر رو بدست میاریم اگر مشترکات با دسترسی های لازم برابر بود
       * پس کاربر همه دسترسی های لازم رو داره
       */
      const userPermissions = authResult.user.role.permissions;

      if (requiredPermissions.length > userPermissions.length) return false;

      return intersection(userPermissions, requiredPermissions).length === requiredPermissions.length;
    }));
  }
}
