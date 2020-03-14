import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { ListComponent } from './list/list.component';
import { AddModifyComponent } from './add-modify/add-modify.component';
import { SingleComponent } from './single/single.component';
import { NgSelect2Module } from 'ng-select2';
import { SharedModule } from '../shared/shared.module';


const routes: Routes = [
  { path: '', component: ListComponent }

]


@NgModule({
  declarations: [
    ListComponent,
    AddModifyComponent,
    SingleComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    NgSelect2Module,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class RolesModule { }
