import { Component, OnInit, Input } from '@angular/core';
import { IPaymentPlan } from '../models';
import { PaymentPlansService } from '../payment-plans.service';

@Component({
  selector: 'app-single',
  templateUrl: './single.component.html',
  styleUrls: ['./single.component.scss']
})
export class SingleComponent implements OnInit {
  @Input() plan: IPaymentPlan;
  constructor(private service: PaymentPlansService) { }

  ngOnInit() {
  }

  buy() {
    this.service.buy(this.plan).subscribe(result => {
      console.log(` you bought the plan ${this.plan.name}`)
    });
  }

}
