import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { LandingpagemainComponent } from './landingpagemain/landingpagemain.component';
import { LandingpagesubComponent } from './landingpagesub/landingpagesub.component';


@NgModule({
  declarations: [
    LandingpagemainComponent,
    LandingpagesubComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
