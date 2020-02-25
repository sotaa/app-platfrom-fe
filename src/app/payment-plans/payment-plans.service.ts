import { Injectable } from '@angular/core';
import { IPaymentPlan } from './models';
import { from, timer } from 'rxjs';
import { AuthHttpClient } from '../auth/auth-http-client.service';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PaymentPlansService {

  constructor(private authHttpClient:AuthHttpClient) { }

  createPaymentPlan( data: IPaymentPlan ){
    return this.authHttpClient.post<IPaymentPlan>(environment.identityUrls.createPaymentPlan,data).pipe(
      map(res => res)
    );
  }

  editPaymentPlan( data: IPaymentPlan, id ){
    return this.authHttpClient.put<IPaymentPlan>(environment.identityUrls.createPaymentPlan + `/${id}`,data).pipe(
      map(res => res)
    );
  }

  getPaymentPlans(){
    return this.authHttpClient.get<IPaymentPlan[]>(environment.identityUrls.readPaymentPlans).pipe(
      map( res => res)
    );
  }

  getPaymentPlan(id){
    return this.authHttpClient.get<IPaymentPlan>(environment.identityUrls.readPaymentPlan.concat(id)).pipe(
      map( res => res)
    );
  }

  deletePaymentPlan( id ){
    return this.authHttpClient.delete(environment.identityUrls.deletePaymentPlan.concat(id)).pipe(map(res=>res))
  }

  buy(plan: IPaymentPlan) {
    /** Mock observabel for testing */
    return from(timer(1000));
  }
}
