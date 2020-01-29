import { Injectable } from '@angular/core';
import { IPaymentPlan } from './models';
import { from, timer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentPlansService {

  constructor() { }

  buy(plan: IPaymentPlan) {
    /** Mock observabel for testing */
    return from(timer(1000));
  }
}
