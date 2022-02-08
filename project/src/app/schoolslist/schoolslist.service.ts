import { Injectable,OnInit} from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {NgForm} from '@angular/forms'
import { Http} from '@angular/http';
import { Observable} from 'rxjs';
import { School } from '../school';
import {LoginFormPosterService} from '../login-form/loginformPoster.service'
import {Router} from'@angular/router'





@Injectable()

export class SchoollistService {

    private schoolurl = 'https://warm-retreat-72056.herokuapp.com/api/schools';
    private createUrl = 'https://warm-retreat-72056.herokuapp.com/api/schools';
    private editUrl   = 'https://warm-retreat-72056.herokuapp.com/api/editschools';
    private removeUrl = 'https://warm-retreat-72056.herokuapp.com/api/removeschools';
    

    constructor(private router:Router, private http: HttpClient, private httpc: Http) {}

    getSchools():Observable<any[]>{
      console.log(this.http.get<any>(this.schoolurl));
        return this.http.get<any>(this.schoolurl);
    }
    
  
      // post("/api/contacts")
      createSchools(newSchool: School): Promise<void | School> {
        var newID =  Math.random().toString(36).substr(2, 9);
        console.log("new ID:", newID);
        var totschools = newID;
        console.log("count total school ",totschools)
        console.log("is this give me the lenght?  :", totschools)
        var tuserId=totschools
        console.log("what is this: ", totschools)
        var valId=(totschools).toString()
        console.log(newSchool.schoolname);
        newSchool._id=valId
        console.log(newSchool._id);
        return this.httpc.post(this.createUrl, newSchool)
                   .toPromise()
                   .then(response => response.json() as School)
                   .catch(this.handleError);
        
      }
      public goBack():void{
        this.router.navigate(['/home'])
      }
      // get("/api/contacts/:id") endpoint not used by Angular app
  
      // delete("/api/contacts/:id")
      deleteSchool(delSchoolId: School): Promise<void | School> {
        var delurl=this.removeUrl
        
        console.log(delSchoolId.toString())
        return this.httpc.delete(delurl+'/'+delSchoolId.toString())
                        .toPromise()
                        .then(response => response.json() as School)
                        .catch(this.handleError);
      }
  
     updateSchool(putSchool: School): Promise<void | School> {
       //var putUrl = this.editUrl + '/' + putContact._id;
       var putUrl = this.editUrl
       console.log(putSchool._id)
       return this.httpc.put(putUrl, putSchool)
                  .toPromise()
                  .then(response => response.json() as School)
                  .catch(this.handleError);
     }
  
      private handleError (error: any) {
        let errMsg = (error.message) ? error.message :
        error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
      }

}