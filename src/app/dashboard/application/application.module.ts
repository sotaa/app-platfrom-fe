import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AddOrUpdateApplicationComponent, ListApplicationComponent } from '.';
import { Routes, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { PremiumCtaComponent } from './premium-cta/premium-cta.component';
import { RemainingTimeComponent } from './remaining-time/remaining-time.component';
import { ExpiredComponent } from './remaining-time/expired/expired.component';
import { SharedModule } from 'src/app/shared/shared.module';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: ListApplicationComponent },
  { pathMatch: 'add', component: AddOrUpdateApplicationComponent },
  { pathMatch: 'update/:id', component: AddOrUpdateApplicationComponent },
];

@NgModule({
  declarations: [
    AddOrUpdateApplicationComponent,
    ListApplicationComponent,
    PremiumCtaComponent,
    RemainingTimeComponent,
    ExpiredComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    TranslateModule,
    SharedModule
  ],
  exports: [RouterModule]
})
export class ApplicationModule { }
