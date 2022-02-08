import { Component, OnInit, OnDestroy } from '@angular/core';
import {Course} from '../course';
import { Http, Response } from '@angular/http';
import { CourseService } from '../course.service';
import {CourselistService} from'../courseslist/courseslist.service';
import {Router} from '@angular/router';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { DataTablesModule } from 'angular-datatables';
import { Subject } from 'rxjs';

//import { map } from 'rxjs/operators';
import 'rxjs/add/operator/map';


@Component({
  selector: 'app-coursedisplay',
  templateUrl: './coursedisplay.component.html',
  styleUrls: ['./coursedisplay.component.css'],
  providers:[CourseService]
})
export class CourseDisplayComponent implements OnInit,OnDestroy {

  dtOptions: DataTables.Settings = {};
  contacts: Course[] = [];
  selectedCourse: Course
    dtTrigger: Subject<Course> = new Subject();
  
    constructor(private http:Http,private userService:CourselistService, private router:Router, private contactService: CourseService) { }
  

  ngOnInit(): void {
    
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 8
    };
    this.userService.getCourses()
    .subscribe(persons => {
      this.contacts = persons;
      // Calling the DT trigger to manually render the table
      this.dtTrigger.next();
    });
    
  }
  selectCourse(course: Course) {
    this.selectedCourse = course
    console.log(this.selectCourse)
  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  private extractData(res: Response) {
    const body = res.json();
    return body.data || {};
  }
    


}
