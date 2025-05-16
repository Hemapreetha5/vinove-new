import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingpagesubComponent } from './landingpagesub/landingpagesub.component';
import { LandingpagemainComponent } from './landingpagemain/landingpagemain.component';

const routes: Routes = [
  {path:'landingpagesub',component:LandingpagesubComponent},
  {path:'landingpagemain',component:LandingpagemainComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
