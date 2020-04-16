import { ITokenPair } from './models/token.interface';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { IAuthResult, IAuthData } from './models';
import { tap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { intersection } from 'lodash';
import { Store } from '@ngrx/store';
import { IAuthState } from './reducers/auth-state.interface';
import { ChangeUser } from './reducers/actions';
import { IUser } from '../user/models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  refreshToken: string
  interval;
  user;

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
  register( authData: IAuthData) {
    return this.http
      .post<IAuthResult>(environment.identityUrls.register, authData)
      .pipe(tap(res => this.setAuthResult(res)));
  }

  registerByAdmin( authData: IAuthData) {
    return this.http
      .post<IAuthResult>(environment.identityUrls.register, authData)
      .pipe(tap(res => res));
  }

  private getSavedAuthResult() {
    const localAuthResult = sessionStorage.getItem('authResult') ||
      sessionStorage.getItem('authResult');
    return localAuthResult ? JSON.parse(localAuthResult) : undefined;
  }

  getCurrentUser() {
    return this.authStore.select((a: any) => a.authState.authResult);
  }

  private setAuthResult(user: IAuthResult) {
    this.authStore.dispatch(new ChangeUser(user));
    sessionStorage.setItem('authResult', JSON.stringify(user));

    // Get and Set new token in session storage
    //  clearInterval(this.interval);
    //  this.interval =  setInterval(() => {
    //     console.log("GO")
    //     this.getAndSetNewToken();
    //   }, 5000);
  }

  logout() {
    clearInterval(this.interval);
    sessionStorage.clear();
    return this.authStore.dispatch(new ChangeUser(undefined));
  }

  async getAndSetNewToken() {
    // get refresh token from session storage
    await this.getCurrentUserRefreshToken();
    // get new tokens from server with refreshToken
    const res = await this.getNewTokenFromServer(this.refreshToken).toPromise();
    // create new user object with new tokens
    await this.createNewUserObjWithNewTokens(res);
    // set new tokens in session storage
     this.setAuthResult(this.user);
  }

 private getCurrentUserRefreshToken() {
   this.getCurrentUser().subscribe(res => {
     res ? (res.refreshToken ? this.refreshToken = res.refreshToken : this.refreshToken=null) : null;
    })
  }

 private getNewTokenFromServer(refreshToken: string) {
    return this.http
    .get<any>(environment.identityUrls.refreshToken.concat(refreshToken))
      .pipe(tap(res => res));
  }

  private createNewUserObjWithNewTokens(tokens: ITokenPair) {
    this.getCurrentUser().subscribe(res => {
      res ?
     (this.user = res,
      this.user.token = tokens.token,
      this.user.refreshToken = tokens.refreshToken) : null
    })
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
      if(!authResult){return false}
      const userPermissions = authResult.user.role.permissions;

      if (requiredPermissions.length > userPermissions.length) return false;

      return intersection(userPermissions, requiredPermissions).length === requiredPermissions.length;
    }));
  }
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
