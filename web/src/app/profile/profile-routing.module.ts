import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfilemenuComponent } from './profilemenu/profilemenu.component';
import { PersonaldetailComponent } from './personaldetail/personaldetail.component';

const routes: Routes = [
  {path:'profilemenu',component:ProfilemenuComponent},
  {path:'personaldetail',component:PersonaldetailComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
