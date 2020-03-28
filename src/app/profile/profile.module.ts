import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../shared/shared.module';
import { ProfileComponent } from './profile.component';
import { ProfileInfoComponent } from './profile-info/profile-info.component';
import { ProfileInfoEditComponent } from './profile-info-edit/profile-info-edit.component';

const routes: Routes = [
  { path: ':id', component: ProfileComponent }

]

@NgModule({
  declarations: [ ProfileComponent, ProfileInfoComponent, ProfileInfoEditComponent],
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ProfileModule { }
