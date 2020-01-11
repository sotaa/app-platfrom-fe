import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddOrUpdateApplicationComponent , ListApplicationComponent} from '.';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: '', pathMatch: 'full', component: ListApplicationComponent},
  {pathMatch: 'add-or-update', component: AddOrUpdateApplicationComponent}
];

@NgModule({
  declarations: [
    AddOrUpdateApplicationComponent,
    ListApplicationComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ApplicationModule { }
