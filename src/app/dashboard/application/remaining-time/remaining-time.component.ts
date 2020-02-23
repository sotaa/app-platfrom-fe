import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-remaining-time',
  templateUrl: './remaining-time.component.html',
  styleUrls: ['./remaining-time.component.scss']
})
export class RemainingTimeComponent implements OnInit {
  user = { remainingDays: 1 };
  day;
  constructor() {}

  ngOnInit() {
    this.user.remainingDays > 1 ? (this.day = 'days') : (this.day = 'day');
  }
}
