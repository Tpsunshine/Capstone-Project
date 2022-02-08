import { Component, OnInit, Input } from '@angular/core';
import { School } from './../school';
import { SchoolOfService } from './../school.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'schools-details',
  templateUrl: './school.component.html',
  styleUrls: ['./school.component.css']
})
export class SchoolComponent {

  

  @Input()

  school: School;

  

  @Input()
  createHandler: Function;
  @Input()
  updateHandler: Function;
  @Input()
  deleteHandler: Function;
  constructor ( private schoolService: SchoolOfService, private http: HttpClient, private router:Router) {}

  createSchool(school: School) {
    this.schoolService.createSchool(school).then((newSchool: School) => {
      this.createHandler(newSchool);
    
    });
    
  }

  updateSchool(school: School): void {
    this.schoolService.updateSchool(school).then((updatedSchool: School) => {
      this.updateHandler(updatedSchool);
    });
    
    
  }

  deleteSchool(schoolId: String): void {
    this.schoolService.deleteSchool(schoolId).then((deletedSchoolId: String) => {
      this.deleteHandler(deletedSchoolId);
    });
    
  }
}
