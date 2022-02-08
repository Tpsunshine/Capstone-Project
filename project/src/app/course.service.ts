import { Injectable } from '@angular/core';
import { Course } from './course';
import { Http, Response } from '@angular/http';

@Injectable()
export class CourseService {
    private coursesUrl = 'https://warm-retreat-72056.herokuapp.com/api/courses';

    constructor (private http: Http) {}

    // get("/api/contacts")
    getCourses(): Promise<void | Course[]> {
      return this.http.get(this.coursesUrl)
                 .toPromise()
                 .then(response => response.json() as Course[])
                 .catch(this.handleError);
    }

    // post("/api/contacts")
    createCourse(newContact: Course): Promise<void | Course> {
      return this.http.post(this.coursesUrl, newContact)
                 .toPromise()
                 .then(response => response.json() as Course)
                 .catch(this.handleError);
    }

    // get("/api/contacts/:id") endpoint not used by Angular app

    // delete("/api/contacts/:id")
    deleteCourse(delCourseId: String): Promise<void | String> {
      return this.http.delete(this.coursesUrl + '/' + delCourseId)
                 .toPromise()
                 .then(response => response.json() as String)
                 .catch(this.handleError);
    }

    // put("/api/contacts/:id")
    updateCourse(putCourse: Course): Promise<void | Course> {
      var putUrl = this.coursesUrl + '/' + putCourse._id;
      return this.http.put(putUrl, putCourse)
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