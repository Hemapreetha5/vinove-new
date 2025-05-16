import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfilemenuComponent } from './profilemenu/profilemenu.component';
import { PersonaldetailComponent } from './personaldetail/personaldetail.component';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  declarations: [
    ProfilemenuComponent,
    PersonaldetailComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,MatInputModule,MatFormFieldModule,FormsModule,MatIconModule
  ]
})
export class ProfileModule { }
