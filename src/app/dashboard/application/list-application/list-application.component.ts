import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IApplication } from '../models';
import { ApplicationService } from '../application.service';

@Component({
  selector: 'app-list-application',
  templateUrl: './list-application.component.html',
  styleUrls: ['./list-application.component.scss']
})
export class ListApplicationComponent implements OnInit {

  applications: Observable<IApplication[]>;

  constructor(private appService: ApplicationService) { }

  ngOnInit() {
    this.applications = this.appService.getApplications();
  }

}
