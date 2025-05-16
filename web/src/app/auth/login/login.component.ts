import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  
  hide = true;
  constructor(private router: Router) 
  { 
    
  }

  ngOnInit(): void {
  }

  onLoginClick($event: MouseEvent) {
    this.router.navigateByUrl('/landingpagemain');
}



}
