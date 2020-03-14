import { Injectable } from '@angular/core';
import { IRole } from './models';
import { AuthHttpClient } from '../auth/auth-http-client.service';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  constructor(private authHttpClient: AuthHttpClient) { }

  createRole(data: IRole) {
    return this.authHttpClient.post<IRole>(environment.identityUrls.createRole, data).pipe(
      map(res => res)
    );
  }

  editRole(data: IRole, title) {
    return this.authHttpClient.put<IRole>(environment.identityUrls.createRole + `/${title}`, data).pipe(
      map(res => res)
    );
  }

  getRoles() {
    return this.authHttpClient.get<IRole[]>(environment.identityUrls.readRoles).pipe(
      map(res => res)
    );
  }

  getRole(title) {
    return this.authHttpClient.get<IRole>(environment.identityUrls.readRoles + `/${title}`).pipe(
      map(res => res)
    );
  }

  deleteRole(title) {
    return this.authHttpClient.delete(environment.identityUrls.deleteRole + `/${title}`).pipe(map(res => res))
  }
}
