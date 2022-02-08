import {Component} from '@angular/core';
import {IRegister} from './register-forms.model';
import {NgForm} from '@angular/forms';
import {RegisterFormPosterService} from './register-formPoster.service';
import {Router} from '@angular/router';
 import {Http} from '@angular/http';
 import { HttpService } from "../Shared/http.service";

@Component({
    selector:'app-registerforms',
    templateUrl:'./register-forms.component.html',
    styleUrls:['./register-forms.component.css']
})

export class RegisterFormsComponent{
    constructor(private registerformPosterService:RegisterFormPosterService,
        private router: Router,private http:HttpService){}


 myUser = new IRegister('John','j@j.com','23345fsfs')
 firstToUpper(value: string): void{
     if(value.length > 0){
         //this.myUser.name = value.toUpperCase()
     }else{
         this.myUser.username = value
     }

 }

RegistersubmitForm(form:NgForm):void
{
    console.log("--form Submited", form.value);
    let user ={
        name: this.myUser.email,
        password: this.myUser.password
    }
    console.log("--user ", user.name);
    this.http.sendEmail("http://localhost:3000/sendmail",user).subscribe(
        data =>{
            let res:any =data;
            console.log(`👏 > 👏 > 👏 > 👏 ${user.name} is successfully register and mail has been sent and the message id is ${res.messageId}`)
        }
    )
    this.registerformPosterService.registerUser(form.value)
    .subscribe((res) => this.router.navigate(['/login']));
}
}