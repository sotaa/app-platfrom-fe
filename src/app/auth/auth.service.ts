import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { IAuthResult } from './models';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser: IAuthResult;
  constructor(private http: HttpClient) {}

  /**
   * Performs login action.
   * @param username Username (email)
   * @param password Password
   */
  login(username: string, password: string) {
    return this.http
      .post<IAuthResult>(environment.identityUrls.login, { username, password })
      .pipe(tap(res => this.setCurrentUser(res)));
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
      .pipe(tap(res => this.setCurrentUser(res)));
  }

  logout() {
    localStorage.clear();
  }

  getCurrentUser(): IAuthResult {
    const localUserStr =
      this.currentUser ||
      sessionStorage.getItem('currentUser') ||
      sessionStorage.getItem('currentUser');
    if (!localUserStr) {
      return null;
    }

    if (typeof localUserStr === 'string') {
      this.currentUser = JSON.parse(localUserStr);
    }
    return this.currentUser;
  }

  setCurrentUser(user: IAuthResult) {
    this.currentUser = user;
    sessionStorage.setItem('currentUser', JSON.stringify(user));
  }

  rememberCurrentUser() {
    localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
  }
}
