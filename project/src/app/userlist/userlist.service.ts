import { Injectable,OnInit} from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {NgForm} from '@angular/forms'
import { Http} from '@angular/http';
import { Observable} from 'rxjs';
import { Contact } from '../contact';
import {LoginFormPosterService} from '../login-form/loginformPoster.service';
import {Router} from'@angular/router'





@Injectable()

export class UserlistService {

    private userurl = 'https://infinite-everglades-58692.herokuapp.com/api/auth/users';
    private createUrl = 'https://infinite-everglades-58692.herokuapp.com/api/auth/register';
    private editUrl = 'https://infinite-everglades-58692.herokuapp.com/api/auth/edituser';
    private removeUrl = 'https://infinite-everglades-58692.herokuapp.com/api/auth/removeuser';
    private teacherUrl ='https://infinite-everglades-58692.herokuapp.com/api/auth/teacher'
    private studentUrl ='https://infinite-everglades-58692.herokuapp.com/api/auth/student'
    

    constructor(private router:Router, private http: HttpClient, private httpc: Http, private loginformPosterService:LoginFormPosterService) {}

    getUsers():Observable<any[]>{
        return this.http.get<any>(this.userurl)
    }
    getContacts():Observable<any[]>{
        return this.http.get<any>(this.userurl)
    }
  getTeachers():Observable<any[]>{
    return this.http.get<any>(this.teacherUrl)
  }
  getStudents():Observable<any[]>{
    return this.http.get<any>(this.studentUrl)
  }
     
  
      // post("/api/contacts")
      createContact(newContact: Contact): Promise<void | Contact> {
        var newID =  Math.random().toString(36).substr(2, 9);
        console.log("new ID:", newID);
        var totusers = newID;
        console.log("count total users ",totusers)
        console.log("is this give me the lenght?  :", totusers)
        var tuserId=totusers
        console.log("what is this: ", totusers)
        var valId=(totusers).toString()
        console.log(newContact.username);
        newContact._id=valId
        console.log(newContact._id);
        return this.httpc.post(this.createUrl, newContact)
                   .toPromise()
                   .then(response => response.json() as Contact)
                   .catch(this.handleError);
        
      }
      public goBack():void{
        this.router.navigate(['/profile'])
      }
      // get("/api/contacts/:id") endpoint not used by Angular app
  
      // delete("/api/contacts/:id")
      deleteContact(delContactId: Contact): Promise<void | Contact> {
        var delurl=this.removeUrl
        
        console.log(delContactId.toString())
        return this.httpc.delete(delurl+'/'+delContactId.toString())
                        .toPromise()
                        .then(response => response.json() as Contact)
                        .catch(this.handleError);
      }
  
     updateContact(putContact: Contact): Promise<void | Contact> {
      var showUrl = this.editUrl + '/' + putContact._id;
      console.log("show url    ", showUrl );
       var putUrl = this.editUrl
       console.log("id:  ",putContact._id)
       return this.httpc.put(putUrl, putContact)
                  .toPromise()
                  .then(response => response.json() as Contact)
                  .catch(this.handleError);
     }
  
      private handleError (error: any) {
        let errMsg = (error.message) ? error.message :
        error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
      }

}