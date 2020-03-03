import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddModifyComponent } from './add-modify/add-modify.component';
import { ListComponent } from './list/list.component';
import { SingleComponent } from './single/single.component';
import { Routes, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { PayIsSuccessComponent } from './pay-is-success/pay-is-success.component';
import { PayIsFailComponent } from './pay-is-fail/pay-is-fail.component';

const routes: Routes = [
  { path: '', component: ListComponent },
  { path: 'payment/success', component: PayIsSuccessComponent },
  { path: 'payment/fail', component: PayIsFailComponent },

]

@NgModule({
  declarations: [AddModifyComponent, ListComponent, SingleComponent, PayIsSuccessComponent, PayIsFailComponent],
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class PaymentPlansModule { }
