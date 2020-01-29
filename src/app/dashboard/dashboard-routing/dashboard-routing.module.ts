import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from '../layout/layout.component';

const routes: Routes = [
  {path: '', component: LayoutComponent, children: [
    {path: '', pathMatch: 'full', loadChildren: '../application/application.module#ApplicationModule'},
    {path: 'payment-plans', loadChildren: '../../payment-plans/payment-plans.module#PaymentPlansModule'},
  ]},
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class DashboardRoutingModule { }
