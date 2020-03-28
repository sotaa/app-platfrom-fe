import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from '../layout/layout.component';

const routes: Routes = [
  {
    path: '', component: LayoutComponent, children: [
      { path: '', pathMatch: 'full', loadChildren: '../application/application.module#ApplicationModule' },
      { path: 'profile', loadChildren: '../../profile/profile.module#ProfileModule' },
      { path: 'payment-plans', loadChildren: '../../payment-plans/payment-plans.module#PaymentPlansModule' },
      { path: 'roles', loadChildren: '../../roles/roles.module#RolesModule' },
      { path: 'users', loadChildren: '../../user/user.module#UserModule' },
    ]
  },
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
