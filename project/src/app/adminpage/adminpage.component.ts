import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-adminpage',
  templateUrl: './adminpage.component.html',
  styleUrls: ['./adminpage.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
    
  }
  logoutUser(){
    localStorage.removeItem('TOKEN_NUMBER');
    localStorage.removeItem('ROLE_TYPE');
    this.router.navigate(['./login']);
  
  }
}
