import { Component, OnInit, Input } from '@angular/core';
import { IUser } from '../../user/models';

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.scss']
})
export class ProfileInfoComponent implements OnInit {
  @Input() user: IUser;
  constructor() {}

  ngOnInit() {}
}
