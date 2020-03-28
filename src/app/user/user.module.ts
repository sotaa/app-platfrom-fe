import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';
import { AddModifyComponent } from './add-modify/add-modify.component';
import { FormsModule } from '@angular/forms';
import { NgSelect2Module } from 'ng-select2';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../shared/shared.module';
import { GridComponent } from './grid/grid.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';


const routes: Routes = [
  { path: '', component: ListComponent }

]

@NgModule({
  declarations: [ListComponent,AddModifyComponent, GridComponent],
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    NgSelect2Module,
    SharedModule,
    NgxDatatableModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class UserModule { }
