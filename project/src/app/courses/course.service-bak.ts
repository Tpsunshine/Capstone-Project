import { Injectable,OnInit} from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {NgForm} from '@angular/forms'
import { Http} from '@angular/http';
import { Observable} from 'rxjs';
import { Course } from '../course';
import {LoginFormPosterService} from '../login-form/loginformPoster.service'
import {Router} from'@angular/router'





@Injectable()

export class CoursesService {

    private courseurl   = 'https://warm-retreat-72056.herokuapp.com/api/courses';
    private createUrl = 'https://warm-retreat-72056.herokuapp.com/api/courses';
    private editUrl   = 'https://warm-retreat-72056.herokuapp.com/api/courses';
    private removeUrl = 'https://warm-retreat-72056.herokuapp.com/api/courses';

    

    constructor(private router:Router, private http: HttpClient, private httpc: Http) {}

    getCourses():Observable<any[]>{
        return this.http.get<any>(this.courseurl)
    }
    
  
      // post("/api/contacts")
      createCourse(newCourse: Course): Promise<void | Course> {
        var newID =  Math.random().toString(36).substr(2, 9);
        console.log("new ID:", newID);
        var totusers = newID;
        console.log("count total users ",totusers)
        console.log("is this give me the lenght?  :", totusers)
        var tuserId=totusers
        console.log("what is this: ", totusers)
        var valId=(totusers).toString()
        console.log(newCourse.coursename);
        newCourse._id=valId
        console.log(newCourse._id);
        return this.httpc.post(this.createUrl, newCourse)
                   .toPromise()
                   .then(response => response.json() as Course)
                   .catch(this.handleError);
        
      }
      public goBack():void{
        this.router.navigate(['/profile'])
      }
      // get("/api/contacts/:id") endpoint not used by Angular app
  
      // delete("/api/contacts/:id")
      deleteCourse(delCourseId: Course): Promise<void | Course> {
        var delurl=this.removeUrl
        
        console.log(delCourseId.toString())
        return this.httpc.delete(delurl+'/'+delCourseId.toString())
                        .toPromise()
                        .then(response => response.json() as Course)
                        .catch(this.handleError);
      }
  
     updateCourse(putCourse: Course): Promise<void | Course> {
       var putUrl = this.editUrl + '/' + putCourse._id;
       //var putUrl = this.editUrl
       console.log("course id ",putCourse._id)
       console.log("Url ",putUrl)
       return this.httpc.put(putUrl, putCourse)
                  .toPromise()
                  .then(response => response.json() as Course)
                  .catch(this.handleError);
     }
  
      private handleError (error: any) {
        let errMsg = (error.message) ? error.message :
        error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
      }

}