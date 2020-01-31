import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthHttpClient {
  private requestOptions: { headers?: { Authorization: string } };

  constructor(private http: HttpClient, private authService: AuthService) {
    this.requestOptions = {};
    authService.getCurrentUser().subscribe(authResult => {
      this.requestOptions.headers.Authorization = `Bearer ${authResult.token}`;
    });
  }

  get<T>(url: string, options: object = {}) {
    return this.http.get<T>(url, { ...this.requestOptions, ...options });
  }

  post<T>(url: string, data: any, options: object = {}) {
    return this.http.post<T>(url, data, { ...this.requestOptions, ...options });
  }

  put<T>(url: string, data: any, options: object = {}) {
    return this.http.put<T>(url, data, { ...this.requestOptions, ...options });
  }

  delete<T>(url: string, options: object = {}) {
    return this.http.delete<T>(url, { ...this.requestOptions, ...options });
  }

  options<T>(url: string, options: object = {}) {
    return this.options<T>(url, { ...this.requestOptions, ...options });
  }

  head(url: string, options: object = {}) {
    return this.http.head(url, { ...this.requestOptions, ...options });
  }
}
