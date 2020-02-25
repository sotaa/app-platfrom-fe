import {
  Component,
  OnInit,
  ViewChild,
  Output,
  EventEmitter,
  Input
} from '@angular/core';
import { NgForm } from '@angular/forms';
import  { IPaymentPlan,PaymentPlan } from '../models/payment-plan.interface';
import { PaymentPlansService } from '../payment-plans.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'plan-add-modify',
  templateUrl: './add-modify.component.html',
  styleUrls: ['./add-modify.component.scss']
})
export class AddModifyComponent implements OnInit {
  @ViewChild( 'f' ) form: NgForm;
  @Output() closePlanForm = new EventEmitter<boolean>();
  @Output() reFetchApplications = new EventEmitter<boolean>();
  @Input() fetchedPlan: IPaymentPlan;
  @Input() editMode: boolean;
  name: string;
  price: number;
  dateRange: number;
  isActive: boolean;
  description: string;
  paymentPlan: IPaymentPlan;
  isLoading: boolean;
  errorMessage: string;
  constructor(private paymentPlansService:PaymentPlansService){
    this.paymentPlan = new PaymentPlan();
  }

  ngOnInit(){
    if (  this.editMode  ){
      this.name = this.fetchedPlan.name;
      this.price = this.fetchedPlan.price;
      this.dateRange = this.fetchedPlan.dateRange;
      this.isActive = this.fetchedPlan.isActive;
      this.description = this.fetchedPlan.description;
    }
   }

  submit(){
    this.fillplanDataForSendingToServer();
    if ( this.form.valid ){
      this.isLoading = true;
      console.log(this.paymentPlan)
      let request = this.paymentPlansService.createPaymentPlan( this.paymentPlan );

      if ( this.editMode ){
        request = this.paymentPlansService
          .editPaymentPlan( this.paymentPlan, this.fetchedPlan.id);
      }
        request.pipe( finalize( () => this.isLoading = false ) ).subscribe( res =>{
            alert( `Payment Plan is ${this.editMode ? `updated`: `created`}`);
            this.reFetchApplications.emit();
          },
          errorResponse => {
            this.errorMessage = errorResponse.error.message || 'UNKNOWN_ERROR';
          }
        );
    } else{
      this.errorMessage = 'VALIDATION_ERROR';
    }
  }

  fillplanDataForSendingToServer(){
    this.paymentPlan.name = this.name;
    this.paymentPlan.price = this.price;
    this.paymentPlan.dateRange = this.dateRange;
    this.isActive ? ( this.paymentPlan.isActive = true ) : ( this.paymentPlan.isActive = false );
    this.paymentPlan.description = this.description;
  }

  emitClosePlanForm(){
    this.closePlanForm.emit();
  }
}
