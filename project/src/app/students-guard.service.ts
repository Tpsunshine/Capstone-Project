import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, Router} from '@angular/router'

@Injectable()

export class StudentGuardService implements CanActivate{
    token:string;
    role: string

    constructor(private router: Router){}

    canActivate(router: ActivatedRouteSnapshot) : boolean{
        this.token = localStorage.getItem('TOKEN_NUMBER');
        this.role = localStorage.getItem('ROLE_TYPE');
        console.log("token : ",this.token);
        if(this.token === null ){

            this.router.navigate(['/login']);
            return false;
        }
        console.log("role : ",this.role);
        if(this.token === null && this.role === null){
            this.router.navigate(['/login']);
            return false;
        }

        if((this.token !== null && this.role !== 'admin') && (this.token !== null && this.role !== 'teacher') && (this.token !== null && this.role !== 'user') ){
            this.router.navigate(['/login']);
             return false;
         }
         if((this.token !== null && this.role === 'admin')  ) {
             return true;
         }else{
             if(this.token !== null && this.role === 'teacher')
             {
                 return true;
             }else {
             if(this.token !== null && this.role === 'user')
             {
                 return true;
             }
         }
 
         }

    }
}