import { Component, OnInit } from '@angular/core';
import { IPaymentPlan } from '../models';

@Component({
  selector: 'plan-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  plans: IPaymentPlan[];
  constructor() {
    this.plans= [{name: 'shit', price: 2000, isActive: true, id: 1243, dateRange:30 ,description: 'this is sample plan'}];
   }

  ngOnInit() {
  }

}
