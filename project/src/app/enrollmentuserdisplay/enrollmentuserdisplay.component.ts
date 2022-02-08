import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import {Enrollment} from '../enrollment';
import { Http, Response } from '@angular/http';
import { EnrollmentService } from '../enrollment.service';
import {SchoollistService} from'../schoolslist/schoolslist.service';
import {Router} from '@angular/router';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { DataTablesModule } from 'angular-datatables';
import { Subject } from 'rxjs';

//import { map } from 'rxjs/operators';
import 'rxjs/add/operator/map';


@Component({
  selector: 'app-enrolluserdisplay',
  templateUrl: './enrollmentuserdisplay.component.html',
  styleUrls: ['./enrollmentuserdisplay.component.css'],
  providers:[EnrollmentService]
})
export class EnrollmentUserDisplayComponent implements OnInit,OnDestroy {
  @Input() 
  enrollMessages:string;


  dtOptions: DataTables.Settings = {};
  contacts: any;
  selectedEnroll: Enrollment
    dtTrigger: Subject<Enrollment> = new Subject();
  
    constructor(private http:Http,private userService:SchoollistService, private router:Router, private contactService: EnrollmentService) { }
  

  ngOnInit(): void {
    
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 8
    };
   var lista =  this.contactService.getEnrollers()
   .subscribe(persons => {
     this.contacts = persons;
     // Calling the DT trigger to manually render the table
     this.dtTrigger.next();
   });
   console.log(this.contacts.values)
 }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  private extractData(res: Response) {
    const body = res.json();
    return body.data || {};
  }
  selectEnroll(enroll: Enrollment) {
    this.selectedEnroll = enroll
    console.log(this.selectEnroll)
  }


}
