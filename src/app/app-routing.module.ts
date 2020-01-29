import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IsAuthenticatedGuard } from './guard/is-authenticated.guard';
import { HasPermissionGuard } from './guard/has-permission.guard';

const routes: Routes = [
  {path: 'auth', loadChildren: './auth/auth.module#AuthModule'},
  {path: '', canActivate: [IsAuthenticatedGuard], canActivateChild: [HasPermissionGuard], loadChildren: './dashboard/dashboard.module#DashboardModule'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
