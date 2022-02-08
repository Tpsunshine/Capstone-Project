import { Component, OnInit, OnDestroy } from '@angular/core';
import {School} from './../school';
import { Http, Response } from '@angular/http';
import { SchoolOfService } from '../school.service';
import {SchoollistService} from'../schoolslist/schoolslist.service';
import {Router} from '@angular/router';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { DataTablesModule } from 'angular-datatables';
import { Subject } from 'rxjs';

//import { map } from 'rxjs/operators';
import 'rxjs/add/operator/map';


@Component({
  selector: 'app-schooldisplay',
  templateUrl: './schooldisplay.component.html',
  styleUrls: ['./schooldisplay.component.css'],
  providers:[SchoolOfService]
})
export class SchoolDisplayComponent implements OnInit,OnDestroy {

  dtOptions: DataTables.Settings = {};
  contacts: School[] = [];
  selectedSchool: School
    dtTrigger: Subject<School> = new Subject();
  
    constructor(private http:Http,private userService:SchoollistService, private router:Router, private contactService: SchoolOfService) { }
  

  ngOnInit(): void {
    
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 8
    };
   var lista = this.userService.getSchools()
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
  selectSchool(school: School) {
    this.selectedSchool = school
    console.log(this.selectSchool)
  }


}
