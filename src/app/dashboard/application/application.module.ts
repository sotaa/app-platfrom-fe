import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddOrUpdateApplicationComponent , ListApplicationComponent} from '.';
import { Routes, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

const routes: Routes = [
  {path: '', pathMatch: 'full', component: ListApplicationComponent},
  {pathMatch: 'add', component: AddOrUpdateApplicationComponent},
  {pathMatch: 'update/:id', component: AddOrUpdateApplicationComponent},
];

@NgModule({
  declarations: [
    AddOrUpdateApplicationComponent,
    ListApplicationComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TranslateModule
  ],
  exports: [RouterModule]
})
export class ApplicationModule { }
