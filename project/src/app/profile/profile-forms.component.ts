import {Component, OnInit} from '@angular/core';
import {Iuser} from './profile-forms.model';
import {Contact} from './../contact';
import {NgForm} from '@angular/forms';
import {ProfileFormPosterService} from './profilePoster.service';
import {Router} from '@angular/router';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { DataTablesModule } from 'angular-datatables';
import { Subject,  BehaviorSubject, Observable } from 'rxjs';
import {Enrollment} from './../enrollment';
import {EnrollmentService} from './../enrollment.service'
import { UserlistService } from '../userlist/userlist.service';



@Component({
    selector:'app-profileforms',
    templateUrl:'./profile-forms.component.html',
    styleUrls:['./profile-forms.component.css'],
    providers: [EnrollmentService]
})

export class ProfileFormsComponent implements OnInit{
  private userurl = 'https://infinite-everglades-58692.herokuapp.com/api/auth/users';
  private editurl = 'https://infinite-everglades-58692.herokuapp.com/api/auth/edituser';

    courselist: any[];
    
    contacts: Contact[];
    selectedContact: Contact;
    enrolls: Enrollment[];
      selectedEnroll: Enrollment;
   userinfo;
    token;
   
    constructor(private profileformPosterService:ProfileFormPosterService, 
      private enrollmentService:EnrollmentService,private http: HttpClient,private contactService: UserlistService,
        private router:Router){}
 emplo:Iuser ;
    ngOnInit(){
        this.token = localStorage.getItem('TOKEN_NUMBER');
        this.profileformPosterService.getUserInfo(this.token)
        .subscribe((res) => this.userinfo = res);
        console.log("this user info",  this.profileformPosterService.getUserInfo(this.token)
        .subscribe((res) => this.userinfo = res));
         }
        // parentMessage = this.userinfo;
   
    logoutProfile():void{

        console.log("--logout");
        localStorage.removeItem('TOKEN_NUMBER');
        localStorage.removeItem('ROLE_TYPE');
        this.router.navigate(['/login'])
    }
    private getIndexOfContact = (contactId: String) => {
      return this.contacts.findIndex((contact) => {
        return contact._id === contactId;
      });
    }
    
    selectContact(userinfo: Contact) {
      this.selectedContact = userinfo
      console.log(this.selectContact)
    }
    
    createNewContact() {
      var userinfo: Contact = {
        username: "",
    name:  "",
    firstname: "",
    lastname: "",
    email:  "",
    password: "",
    fulltime:  false,
    gender:  "",
    codelang:  "",
    type: "",
    role: "",
    mobile:  "",
    work:  "",
      };
    
      // By default, a newly-created contact will have the selected state.
      this.selectContact(userinfo);
    }
    updateContact(userinfo: Contact): void {
      console.log("email  ",userinfo.email);
    console.log("gender  ",userinfo.gender);
    this.contactService.updateContact(userinfo).then((updatedContact: Contact) => {
      this.updateContact(updatedContact);
     // window.location.reload();
      //this.router.navigate(['/admin']);
    });
    
    
  }

  deleteContact(userinfoId: Contact): void {
    this.contactService.deleteContact(userinfoId).then((deleteduserinfoId: Contact) => {
      this.deleteContact(deleteduserinfoId);
    });
    
  }
    
   // deleteContact = (contactId: String) => {
   //   var idx = this.getIndexOfContact(contactId);
   //   if (idx !== -1) {
   //     this.contacts.splice(idx, 1);
   //     this.selectContact(null);
   //   }
   //     return this.contacts;
   // }
    
    addContact = (userinfo: Contact) => {
      this.contacts.push(userinfo);
      this.selectContact(userinfo);
      return this.contacts;
    }
    
 //updateContact = (contact: Contact) => {
 //  var idx = this.getIndexOfContact(contact._id);
 //  if (idx !== -1) {
 //    this.contacts[idx] = contact;
 //    this.selectContact(contact);
 //  }
 //  return this.contacts;
 //}
    private getIndexOfEnroll = (enrollId: String) => {
        return this.enrolls.findIndex((enrollers) => {
          return enrollers._id === enrollId;
        });
      }
    selectEnroll(enrollers: Enrollment) {
        this.selectedEnroll = enrollers
        console.log(this.selectEnroll)
      }
    createEnroll() {
        var enrollers: Enrollment = {
          coursename: '',
          teacher:'',
          student: '',
          credit:'',
          grades:''
        };
      
        // By default, a newly-created contact will have the selected state.
        this.selectEnroll(enrollers);
      }
      
      deleteEnroll = (enrollId: String) => {
        var idx = this.getIndexOfEnroll(enrollId);
        if (idx !== -1) {
          this.enrolls.splice(idx, 1);
          this.selectEnroll(null);
        }
          return this.enrolls;
      }
      
      addEnroll = (enrollers: Enrollment) => {
        console.log(enrollers.coursename)
        this.enrolls.push(enrollers);
        this.selectEnroll(enrollers);
        return this.enrolls;
      }
      
      updateEnroll = (enrollers: Enrollment) => {
        console.log(enrollers);
        var idx = this.getIndexOfEnroll(enrollers._id);
        if (idx !== -1) {
          this.enrolls[idx] = enrollers;
          this.selectEnroll(enrollers);
        }
          return this.enrolls;
      }
      canDeactivate(): Observable<boolean> | boolean {
        // Allow synchronous navigation (`true`) if no crisis or the crisis is unchanged
        console.log("in profile");
        return window.confirm('Discard changes?');
      }
  
}