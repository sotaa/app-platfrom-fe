import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { IAuthResult } from './models';
import { tap } from 'rxjs/operators';

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

  getCurrentUser(): IAuthResult {
    const localUserStr =
      this.authResult ||
      sessionStorage.getItem('authResult') ||
      sessionStorage.getItem('authResult');

    if (!localUserStr) {
      return null;
    }

    if (typeof localUserStr === 'string') {
      this.authResult = JSON.parse(localUserStr);
    }
    return this.authResult.user;
  }

  private setAuthResult(user: IAuthResult) {
    this.authResult = user;
    sessionStorage.setItem('authResult', JSON.stringify(user));
  }

  rememberCurrentUser() {
    localStorage.setItem('authResult', JSON.stringify(this.authResult));
  }
}
