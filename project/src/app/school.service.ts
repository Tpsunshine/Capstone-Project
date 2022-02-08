import { Injectable } from '@angular/core';
import { School } from './school';
import { Http, Response } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class SchoolOfService {

  private schoolUrl = 'https://warm-retreat-72056.herokuapp.com/api/schools';

    constructor (private http: Http) {}

    // get("/api/contacts")
    getSchools(): Promise<void | School[]> {
      return this.http.get(this.schoolUrl)
                 .toPromise()
                 .then(response => response.json() as School[])
                 .catch(this.handleError);
    }

    // post("/api/contacts")
    createSchool(newSchool: School): Promise<void | School> {
      return this.http.post(this.schoolUrl, newSchool)
                 .toPromise()
                 .then(response => response.json() as School)
                 .catch(this.handleError);
    }

    // get("/api/contacts/:id") endpoint not used by Angular app

    // delete("/api/contacts/:id")
    deleteSchool(delSchoolId: String): Promise<void | String> {
      return this.http.delete(this.schoolUrl + '/' + delSchoolId)
                 .toPromise()
                 .then(response => response.json() as String)
                 .catch(this.handleError);
    }

    // put("/api/contacts/:id")
    updateSchool(putSchool: School): Promise<void | School> {
      var putUrl = this.schoolUrl + '/' + putSchool._id;
      return this.http.put(putUrl, putSchool)
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


