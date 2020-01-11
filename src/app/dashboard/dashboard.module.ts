import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { FooterComponent } from './layout/footer/footer.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { DashboardRoutingModule } from './dashboard-routing/dashboard-routing.module';
import { AddOrUpdateApplicationComponent } from './application/add-or-update-application/add-or-update-application.component';

@NgModule({
  declarations: [LayoutComponent, SidebarComponent, FooterComponent, NavbarComponent, AddOrUpdateApplicationComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
