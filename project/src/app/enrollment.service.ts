import { Injectable } from '@angular/core';
import { Enrollment } from './enrollment';
import { Http, Response } from '@angular/http';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class EnrollmentService {
    
    private enrollUrl = 'https://warm-retreat-72056.herokuapp.com/api/enroll'

    constructor (private http: Http, private httpc:HttpClient) {}

    getEnrollers():Observable<any[]>{
      console.log(this.httpc.get<any>(this.enrollUrl));
        return this.httpc.get<any>(this.enrollUrl);
    }
    // get("/api/contacts")
    getEnroll(): Promise<void | Enrollment[]> {
      return this.http.get(this.enrollUrl)
                 .toPromise()
                 .then(response => response.json() as Enrollment[])
                 .catch(this.handleError);
    }

    // post("/api/enroll")
    createEnroll(newEnroll: Enrollment): Promise<void | Enrollment> {
      console.log(newEnroll.coursename);
      console.log(newEnroll.teacher);
      console.log(newEnroll.student);
      console.log(newEnroll.credit);
      console.log(newEnroll.grades);
      return this.http.post(this.enrollUrl, newEnroll)
                 .toPromise()
                 .then(response => response.json() as Enrollment)
                 .catch(this.handleError);
    }

    // get("/api/enroll/:id") endpoint not used by Angular app

    // delete("/api/contacts/:id")
    deleteEnroll(delEnrollId: String): Promise<void | String> {
      return this.http.delete(this.enrollUrl + '/' + delEnrollId)
                 .toPromise()
                 .then(response => response.json() as String)
                 .catch(this.handleError);
    }

    // put("/api/contacts/:id")
    updateEnroll(putEnroll: Enrollment): Promise<void | Enrollment> {
      var putUrl = this.enrollUrl + '/' + putEnroll._id;
      return this.http.put(putUrl, putEnroll)
                 .toPromise()
                 .then(response => response.json() as Enrollment)
                 .catch(this.handleError);
    }

    private handleError (error: any) {
      let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
      console.error(errMsg); // log to console instead
    }
}