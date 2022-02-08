import {Component, OnInit} from '@angular/core';
import {Iuser} from './teacherdetail.model';
import {NgForm} from '@angular/forms'
import {TeacherDetailService} from './teacherdetail.service';

import {Router} from '@angular/router';

@Component({
    selector:'app-teacherdetail',
    templateUrl:'./teacherdetail.component.html',
    styleUrls:['./teacherdetail.component.css']
})

export class TeacherDetailComponent implements OnInit{

   userinfo;
    token;
    constructor(private profileformPosterService:TeacherDetailService, 
        private router:Router){}

    ngOnInit(){
        this.token = localStorage.getItem('TOKEN_NUMBER');
        this.profileformPosterService.getUserInfo(this.token)
        .subscribe((res) => this.userinfo = res);
        console.log("this user info", this.userinfo);
    }
    logoutProfile():void{

        console.log("--logout");
        localStorage.removeItem('TOKEN_NUMBER');
        localStorage.removeItem('ROLE_TYPE');
        this.router.navigate(['/login'])
    }

  
}