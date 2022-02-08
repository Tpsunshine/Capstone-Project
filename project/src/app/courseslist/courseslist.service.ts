import { Injectable,OnInit} from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {NgForm} from '@angular/forms'
import { Http} from '@angular/http';
import { Observable} from 'rxjs';
import { Course } from '../course';
import {LoginFormPosterService} from '../login-form/loginformPoster.service'
import {Router} from'@angular/router'





@Injectable()

export class CourselistService {

    private courseurl = 'https://warm-retreat-72056.herokuapp.com/api/courses';
    private createUrl = 'https://warm-retreat-72056.herokuapp.com/api/courses';
    private editUrl   = 'https://warm-retreat-72056.herokuapp.com/api/editcourses';
    private removeUrl = 'https://warm-retreat-72056.herokuapp.com/api/removecourses';
    

    constructor(private router:Router, private http: HttpClient, private httpc: Http) {}

    getCourses():Observable<any[]>{
        return this.http.get<any>(this.courseurl)
    }
    
  
      // post("/api/contacts")
      createCourses(newCourse: Course): Promise<void | Course> {
        var newID =  Math.random().toString(36).substr(2, 9);
        console.log("new ID:", newID);
        var totcourses = newID;
        console.log("count total course ",totcourses)
        console.log("is this give me the lenght?  :", totcourses)
        var tuserId=totcourses
        console.log("what is this: ", totcourses)
        var valId=(totcourses).toString()
        console.log(newCourse.coursename);
        newCourse._id=valId
        console.log(newCourse._id);
        return this.httpc.post(this.createUrl, newCourse)
                   .toPromise()
                   .then(response => response.json() as Course)
                   .catch(this.handleError);
        
      }
      public goBack():void{
        this.router.navigate(['/home'])
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
       //var putUrl = this.editUrl + '/' + putContact._id;
       var putUrl = this.editUrl
       console.log(putCourse._id)
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