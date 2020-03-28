import { IUser } from './models/user.interface';
import { Injectable } from '@angular/core';
import { AuthHttpClient } from '../auth/auth-http-client.service';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private authHttpClient: AuthHttpClient) { }

  getUsers() {
    return this.authHttpClient.get<IUser[]>(environment.identityUrls.readUsers).pipe(
      map(res => res)
    );
  }
  getUser(id) {
    return this.authHttpClient.get<IUser>(environment.identityUrls.readUser.concat(id)).pipe(
      map(res => res)
    );
  }

  updateUserInfo(id:string,userData:IUser) {
    return this.authHttpClient.put<IUser>(environment.identityUrls.updateUserInfo.concat(id),userData).pipe(
      map(res => res)
    );
  }
}
