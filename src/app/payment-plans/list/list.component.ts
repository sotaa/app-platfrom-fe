import { Component, OnInit } from '@angular/core';
import { IPaymentPlan } from '../models';
import { PaymentPlansService } from '../payment-plans.service';
import {PAYMENT_PLAN_CREATE,PAYMENT_PLAN_READ,PAYMENT_PLAN_DELETE,PAYMENT_PLAN_EDIT} from '../../dashboard/permissions.const'
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'plan-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  plans: IPaymentPlan[];
  planFormUP: boolean = false;
  fetchedPlan: IPaymentPlan;
  editMode: boolean = false;
  hasCreatePlanPermission: boolean;
  hasReadPlanPermission: boolean;
  hasEditPlanPermission: boolean;
  hasDeletePlanPermission: boolean;
  constructor(private paymentPlansService:PaymentPlansService, private authService: AuthService) {
  }

  ngOnInit(){
    this.checkPermissions();
    this.getApplications();
  }

  getApplications(){
    this.paymentPlansService.getPaymentPlans().subscribe( res =>  this.plans = res,
    errorResponse =>
    {
      // this.errorMessage = errorResponse.error.message || 'UNKNOWN_ERROR';
    });
  }

  reFetchApps(){
    this.getApplications();
    this.closePlanForm();
  }

  deletePlan( id ){
    this.checkDeletePlanPermision();
      if ( this.hasDeletePlanPermission ){
        if (confirm('Are you sure you want to delete?')) {
          this.paymentPlansService.deletePaymentPlan( id ).subscribe( res =>{
          this.plans = this.plans.filter( f => f.id !== id )
          },
          errorResponse =>{
            // this.errorMessage = errorResponse.error.message || 'UNKNOWN_ERROR';
              } );
        } }else{
        alert( "You don't have DELETE Permission" )
        }
  }

  fetchAppForEdit( id ){
    this.checkEditPlanPermision();
    if ( this.hasEditPlanPermission ){
      this.closePlanForm();
      this.paymentPlansService.getPaymentPlan( id ).subscribe( res =>{
        this.fetchedPlan = res;
        this.editMode = true;
        this.createPlanFormUP();
      },
      errorResponse =>{
        // this.errorMessage = errorResponse.error.message || 'UNKNOWN_ERROR';
        } );}else{
          alert( "You don't have EDIT Permission" )
          }

  }

// check if user have required permission
checkPermissions(){
  this.checkCreatePlanPermision();
  this.checkEditPlanPermision();
  this.checkReadPlanPermision();
  this.checkDeletePlanPermision();
}
checkCreatePlanPermision(){
  const config = [];
  config.push( PAYMENT_PLAN_CREATE);
   this.authService.hasPermission( config )
    .subscribe( hasPermission =>{
    return this.hasCreatePlanPermission = hasPermission
  })
}
checkEditPlanPermision(){
  const config = [];
  config.push( PAYMENT_PLAN_EDIT );
   this.authService.hasPermission( config )
    .subscribe( hasPermission =>{
    return this.hasEditPlanPermission = hasPermission
  })
}
checkReadPlanPermision() {
  const config=[];
  config.push( PAYMENT_PLAN_READ );
   this.authService.hasPermission( config )
    .subscribe( hasPermission =>{
    return this.hasReadPlanPermission = hasPermission
  })
}
checkDeletePlanPermision(){
  const config = [];
  config.push( PAYMENT_PLAN_DELETE );
   this.authService.hasPermission( config )
    .subscribe( hasPermission =>{
    return this.hasDeletePlanPermission = hasPermission
  })
}

  createPlanFormUP() {
    this.planFormUP = true;
  }
  closePlanForm() {
    this.planFormUP = false;
    this.editMode = false;
  }
}
