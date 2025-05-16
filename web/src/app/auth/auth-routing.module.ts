import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ForgotstudentnumberComponent } from './forgotstudentnumber/forgotstudentnumber.component';
import { ForgotpinComponent } from './forgotpin/forgotpin.component';

const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'',component:LoginComponent},
  {path:'forgotstudentnumber',component:ForgotstudentnumberComponent},
  {path:'forgotpin',component:ForgotpinComponent},
  {path:'signup',component:SignupComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
