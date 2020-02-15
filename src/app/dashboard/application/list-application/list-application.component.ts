import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IApplication } from '../models';
import { ApplicationService } from '../application.service';
import { APPLICATION_CREATE,APPLICATION_EDIT,APPLICATION_READ,APPLICATION_DELETE } from '../../permissions.const';
import { AuthService } from 'src/app/auth/auth.service';

@Component( {
  selector: 'app-list-application',
  templateUrl: './list-application.component.html',
  styleUrls: ['./list-application.component.scss']
} )
export class ListApplicationComponent implements OnInit
{
  appFormUP: boolean = false;
  hasCreatAppPermission: boolean;
  hasReadAppPermission: boolean;
  hasEditAppPermission: boolean;
  hasDeleteAppPermission: boolean;

  applications: Observable<IApplication[]>;

  constructor( private appService: ApplicationService, private authService: AuthService ) { }

  ngOnInit(){
    this.checkPermissions();
    this.applications = this.appService.getApplications();
  }

  checkPermissions(){
    this.checkCreatAppPermision();
    this.checkEditAppPermision();
    this.checkReadAppPermision();
    this.checkDeleteAppPermision();
  }
  checkCreatAppPermision(){
    const config = [];
    config.push( APPLICATION_CREATE );
     this.authService.hasPermission( config )
      .subscribe( hasPermission =>{
      return this.hasCreatAppPermission = hasPermission
    })
  }
  checkEditAppPermision(){
    const config = [];
    config.push( APPLICATION_EDIT );
     this.authService.hasPermission( config )
      .subscribe( hasPermission =>{
      return this.hasEditAppPermission = hasPermission
    })
  }
  checkReadAppPermision(){
    const config = [];
    config.push( APPLICATION_READ );
     this.authService.hasPermission( config )
      .subscribe( hasPermission =>{
      return this.hasReadAppPermission = hasPermission
    })
  }
  checkDeleteAppPermision(){
    const config = [];
    config.push( APPLICATION_DELETE );
     this.authService.hasPermission( config )
      .subscribe( hasPermission =>{
      return this.hasDeleteAppPermission = hasPermission
    })
  }
  createAppFormUP(){
  this.appFormUP = true;
  }
  closeAppForm(){
    this.appFormUP = false;
  }
}
