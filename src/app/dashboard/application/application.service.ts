import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IApplication } from './models';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  constructor() { }

  getApplications() {
    return new Observable<IApplication[]>(observer => {
      observer.next([{
        id: 1,
        name: 'app 1',
        isActive: true,
        url: '/app',
        picture: 'https://demos.creative-tim.com/material-dashboard-pro-angular2/assets/img/card-3.jpg',
        description: 'this is some description about the application will goes under it\'s picture'
      }
      ]);
    });
  }
}
