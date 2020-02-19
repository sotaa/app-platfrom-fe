import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IApplication } from './models';
import { AuthHttpClient } from 'src/app/auth/auth-http-client.service';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  constructor(private authHttpClient:AuthHttpClient) { }

  createApplication( data: IApplication ){
    return this.authHttpClient.post<IApplication>(environment.identityUrls.createApplication,data).pipe(
      map(res => res)
    );
  }

  editApplication( data: IApplication, id ){
    return this.authHttpClient.put<IApplication>(environment.identityUrls.createApplication + `/${id}`,data).pipe(
      map(res => res)
    );
  }

  getApplications(){
    return this.authHttpClient.get<IApplication[]>(environment.identityUrls.readApplications).pipe(
      map( res => res)
    );
  }

  getApplication(id){
    return this.authHttpClient.get<IApplication>(environment.identityUrls.readApplication.concat(id)).pipe(
      map( res => res)
    );
  }

  deleteApplication( id ){
    return this.authHttpClient.delete(environment.identityUrls.deleteApplication.concat(id)).pipe(map(res=>res))
  }
}
