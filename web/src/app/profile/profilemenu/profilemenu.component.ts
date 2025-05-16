import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profilemenu',
  templateUrl: './profilemenu.component.html',
  styleUrl: './profilemenu.component.scss'
})
export class ProfilemenuComponent {
  constructor(private router: Router) 
  { 

  }

onProfileMenuClick() {
this.router.navigateByUrl('/personaldetail');
}

}
