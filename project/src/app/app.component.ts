import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
import * as AOS from 'aos';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private router: Router){}

  title = 'School Management System';
  ngOnInit() {
    
  }
  logoutUser():void{

    console.log("--logout");
    localStorage.removeItem('TOKEN_NUMBER');
    localStorage.removeItem('ROLE_TYPE');
    this.router.navigate(['/login'])
}
}
