import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ForgotstudentnumberComponent } from './forgotstudentnumber/forgotstudentnumber.component';
import { ForgotpinComponent } from './forgotpin/forgotpin.component';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule,ReactiveFormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    ForgotstudentnumberComponent,
    ForgotpinComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MatInputModule, 
    MatFormFieldModule,
    FormsModule,
    MatIconModule,
    ReactiveFormsModule
  ],
  exports:[
    LoginComponent
  ]
})
export class AuthModule { }
