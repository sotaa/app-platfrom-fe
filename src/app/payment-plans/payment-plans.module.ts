import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddModifyComponent } from './add-modify/add-modify.component';
import { ListComponent } from './list/list.component';
import { SingleComponent } from './single/single.component';
import { Routes, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

const routes: Routes = [
  {path: '', component: ListComponent}
]

@NgModule({
  declarations: [AddModifyComponent, ListComponent, SingleComponent],
  imports: [
    CommonModule,
    TranslateModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class PaymentPlansModule { }
