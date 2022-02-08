import { Component, ViewChild, OnInit, OnDestroy, Input, AfterViewInit } from '@angular/core';
import {ProfileFormsComponent} from './../profile/profile-forms.component';
import {Contact} from './../contact';
import {Course} from './../course';
import { Http, Response } from '@angular/http';
import { ContactService } from './../contact.service';
import { CourselistService } from './../courseslist/courseslist.service';
import {UserlistService} from'./../userlist/userlist.service';
import {Router} from '@angular/router';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { DataTablesModule } from 'angular-datatables';
import { Subject } from 'rxjs';
import {Enrollment} from './../enrollment';
import {EnrollmentService} from './../enrollment.service'

//import { map } from 'rxjs/operators';
import 'rxjs/add/operator/map';


@Component({
  selector: 'app-enrollment',
  templateUrl: './enrollment.component.html',
  styleUrls: ['./enrollment.component.css'],
  providers:[ContactService]
})

export class EnrollmentComponent implements OnInit,OnDestroy{

  
  
  @Input()
  contact: Contact;
  
  
  @Input() 
  enrollMessage:string;

  @Input()
  enroller:Enrollment;


  
  
  
 contacto="";
  


  @Input()
  createHandler: Function;
  @Input()
  updateHandler: Function;
  @Input()
  deleteHandler: Function;

  dtOptions: DataTables.Settings = {};
  courseslist: any[];
  studentslist: any[];
  teacherslist: any[];
  contacts: Contact[] = [];
    student: Contact
    teacher: Contact
    cursos: Course[] = [];
    
    dtTrigger: Subject<Contact> = new Subject();
    selectedStudent:Contact[]
    selectedTeacher:Contact[] = null;
    selectedCourses:Course[]
    students:any[]
    teachers:any[]
    courses: any[]
    message:string;
    enroll:Enrollment;
    
    private userurl = 'https://warm-retreat-72056.herokuapp.com/api/auth/users';
  private editurl = 'https://warm-retreat-72056.herokuapp.com/api/auth/enroll';

    
  constructor(private http:Http,private courseService:CourselistService,private userService:UserlistService, private router:Router, private contactService: ContactService, private enrollService:EnrollmentService) { }

  enrollers = <Enrollment>{};
  
  ngOnInit(): void {
   var teacherlist="";
    this.dtOptions = {
   pagingType: 'full_numbers',
   pageLength: 8
 };

 //students
 
 this.userService.getStudents()
 .subscribe(persons => {
   this.contacts = persons;
   // Calling the DT trigger to manually render the table
   this.dtTrigger.next();
 });
 //
 this.userService.getStudents()
 .subscribe((res) => this.studentslist = res);

//teachers
console.log("teachers", this.userService.getTeachers());
 this.userService.getTeachers()
 .subscribe(persons => {
   this.contacts = persons;
   console.log("contacts: ",this.contacts )
   //this.teachers=this.contacts;
   //console.log("teachers: ",this.contacts )
   // Calling the DT trigger to manually render the table
   this.dtTrigger.next();
 });
 //
 this.userService.getTeachers()
 .subscribe((res) => this.teachers = res);

 console.log("message",this.enrollMessage);
//this.enroll.student = this.enrollMessage;
this.enrollers.student = this.enrollMessage;
console.log("Student : ",this.enrollers.student)
//courses


this.courseService.getCourses()
.subscribe(coursi => {
  this.courses = coursi;
  // Calling the DT trigger to manually render the table
  this.dtTrigger.next();
});
//
this.courseService.getCourses()
.subscribe((res) => this.courseslist = res);


}


onSelectStudent(studentEmail) { 
  this.selectedStudent = null;
  for (var i = 0; i < this.students.length; i++)
  {
    if (this.students[i].email == studentEmail) {
      this.selectedStudent = this.students[i];
      this.student.email = this.students[i].email;
    }
  }
}
onSelectTeacher(teacherEmail) { 
 
  console.log("teacher", teacherEmail);
  if(teacherEmail.length > 0)
  {
    //this.selectedTeacher = teacherEmail.toString();
    this.enrollers.teacher=teacherEmail.toString();
      console.log( "teacher email: ",this.enrollers.teacher);
  }
 // for (var i = 0; i < this.teachers.length; i++)
 // {
 //   if (this.teachers[i].email == teacherEmail) {
 //     this.selectedTeacher = teacherEmail.toString();
 //     console.log( "teacher email: ",this.selectedTeacher);
 //    // this.teacher.email = this.teacherslist[i].email;
 //   }
 // }
}
onSelectCourses(courseName) { 
  this.selectedCourses = null;
  if(courseName.length >0)
  {
   console.log("course name", );
    var lcoursename=courseName.lastIndexOf(",")
      this.selectedCourses= courseName.toString();
      this.enrollers.coursename=courseName.toString().substr(0,lcoursename);
      this.enrollers.credit=courseName.toString().substr(lcoursename+1);
      this.enrollers.grades="0";
      console.log("course name: ",this.enrollers.coursename);
      console.log("course credit: ",this.enrollers.credit);
      console.log(this.selectedCourses);
    }
}


  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  private extractData(res: Response) {
    const body = res.json();
    return body.data || {};
  }
  
  createEnroll() {
   // console.log("email: ",this.contact.email);
      this.enrollService.createEnroll(this.enrollers).then((newEnroll: Enrollment) => {
      this.createHandler(newEnroll);
    });
    
    
  }
 // updateContact(_id: string,contact:Contact): Observable<Object> {
 //   console.log("contact id ",`${contact}`)
 //       console.log("id: `${_id}`",_id["_id"], "url: ", this.editurl+"/"+_id["_id"]);
//
 //   return this.http.put(`${this.editurl}`, _id);
 // }
  updateEnroll(enroll: Enrollment): void {
    this.enrollService.updateEnroll(enroll).then((updatedEnroll: Enrollment) => {
      this.updateEnroll(updatedEnroll);
      window.location.reload();
  
    });
    
    
  }

  deleteEnroll(enroll: String): void {
    this.enrollService.deleteEnroll(enroll).then((deletedEnroll: String) => {
      this.deleteEnroll(deletedEnroll);
    });
    
  }

}




