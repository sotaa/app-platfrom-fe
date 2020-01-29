import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddModifyComponent } from './add-modify/add-modify.component';
import { ListComponent } from './list/list.component';
import { SingleComponent } from './single/single.component';

@NgModule({
  declarations: [AddModifyComponent, ListComponent, SingleComponent],
  imports: [
    CommonModule
  ]
})
export class PaymentPlansModule { }
