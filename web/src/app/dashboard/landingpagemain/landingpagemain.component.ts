import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landingpagemain',
  templateUrl: './landingpagemain.component.html',
  styleUrl: './landingpagemain.component.scss'
})
export class LandingpagemainComponent {
  constructor(private router: Router) 
  { 

  }

onHomeClink() {
  this.router.navigateByUrl('/profilemenu');
}

}
