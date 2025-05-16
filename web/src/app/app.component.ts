import { Component, ViewChild } from '@angular/core';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError, RoutesRecognized} from '@angular/router';
import { filter, pairwise } from 'rxjs';
import { Location } from '@angular/common'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title:string = 'Login';
  isLogin:boolean=true;
  isDashboard:boolean=false;
  isBack:boolean=false;
  isProfile:boolean=false;
  imgSignOut:string='/featherIcons/power.svg';
  imgBack:string='/featherIcons/arrow-left.svg';
  constructor(private router: Router,private location: Location) 
  { 
    
  }

  ngDoCheck()
  {
      this.router.events.subscribe((event: Event) => {
        if (event instanceof NavigationEnd) {
            this.title = event.url;
            if(this.title.length==1)
            {
                this.title='Login';
                this.isLogin=true;
                this.isBack=false;
                this.isProfile=false;
            }else if(this.title.indexOf('landingpagemain')>0)
            {
                this.title='Home';
                this.isLogin=false;
                this.isDashboard=true;
                this.isBack=false;
                this.isProfile=false;
            }else if(this.title.indexOf('profile')>0)
            {
              this.title='Home / Profile';
              this.isLogin=false;
              this.isDashboard=false;
              this.isBack=true;
              this.isProfile=true;
            }else if(this.title.indexOf('personaldetail')>0)
            {
                this.title='Home / Profile / Personal Details';
                this.isLogin=false;
                this.isDashboard=false;
                this.isBack=true;
                this.isProfile=true;
            }
        }
      });
  }

  onDashboardClick()
  {
    if(!this.isLogin && this.isDashboard)
    {
      this.router.navigateByUrl('/');
    }

    if(!this.isLogin && !this.isDashboard )
    {
        this.location.back();
    }
  }

  onHomeClick()
  {
    this.router.navigateByUrl('/landingpagemain');
  }
  
  activeLinkClick()
  {
    var x = document.getElementById("myLinks") as HTMLElement;
    if (x.style.display === "block") {
      x.style.display = "none";
    } else {
      x.style.display = "block";
    }
  }
}
