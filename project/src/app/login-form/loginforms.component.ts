import {Component} from '@angular/core';
import {ILogin} from './loginforms.model';
import {NgForm} from '@angular/forms'
import {LoginFormPosterService} from './loginformPoster.service';
import {Router} from '@angular/router'

@Component({
    selector:'app-loginforms',
    templateUrl:'./loginforms.component.html',
    styleUrls:['./loginforms.component.css']
})

export class LoginFormsComponent{
    constructor(private loginformPosterService:LoginFormPosterService,
        private router: Router){}
 

 myUser = new ILogin('','')
 
LoginsubmitForm(form:NgForm):void
{
    console.log("--loginform Submited", form.value);
  var logs= this.loginformPosterService.loginUser(form.value)
    .subscribe((res) => this.loginformPosterService.getUserInfo(res['token'])
    .subscribe((response) => this.userRole(response['role'])));
    console.log("logs:  ",logs);
}
userRole(typeOfRole):void{
    
    console.log("--loginform userRole", typeOfRole);
    localStorage.setItem('ROLE_TYPE', typeOfRole);
    if(typeOfRole === "admin")
    {
    this.router.navigate(['/admin']);
    }
    else{
        if(typeOfRole ==='teacher')
        {
        this.router.navigate(['/teacherdetail']);
        }else{
            this.router.navigate(['/profile']);
        }
    }
    
}
}