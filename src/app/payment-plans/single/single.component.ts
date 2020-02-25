import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { IPaymentPlan } from '../models';
import { PaymentPlansService } from '../payment-plans.service';

@Component({
  selector: 'plan-single',
  templateUrl: './single.component.html',
  styleUrls: ['./single.component.scss']
})
export class SingleComponent implements OnInit
{
  @Output() deletePlan = new EventEmitter<boolean>();
  @Output() editPlan = new EventEmitter<boolean>();
  @Input() plan: IPaymentPlan;
  @Input() hasEditPlanPermission: boolean;
  @Input() hasDeletePlanPermission: boolean;
  constructor(private service: PaymentPlansService) { }

  ngOnInit(){
  }

  deletePaymentPlan( id ){
    this.deletePlan.emit( id );
  }
  editPaymentPlan( id ){
    this.editPlan.emit( id );
  }

  buy() {
    this.service.buy(this.plan).subscribe(result => {
      console.log(` you bought the plan ${this.plan.name}`)
    });
  }

}
