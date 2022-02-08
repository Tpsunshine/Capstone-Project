import { Component, OnInit } from '@angular/core';
import {Router,RouterEvent,NavigationEnd} from '@angular/router';
import { filter } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as AOS from 'aos';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router:Router ) {}
  fetchData;
  
  ngOnInit(): void {
    AOS.init()
    this.router.events.pipe(
      filter((event: RouterEvent) => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.fetchData();
    });
  }
 

}
