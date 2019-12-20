import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { FooterComponent } from './layout/footer/footer.component';
import { NavbarComponent } from './layout/navbar/navbar.component';

@NgModule({
  declarations: [LayoutComponent, SidebarComponent, FooterComponent, NavbarComponent],
  imports: [
    CommonModule
  ]
})
export class DashboardModule { }
