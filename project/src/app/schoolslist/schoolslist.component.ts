import { Component, OnInit } from '@angular/core';
import {SchoollistService} from'./schoolslist.service';
import {SchoolOfService} from'./../school.service';
import { School } from '../school';
import {Router} from '@angular/router'
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-schoolslist',
  templateUrl: './schoolslist.component.html',
  styleUrls: ['./schoolslist.component.css'],
  providers:[SchoollistService]
})
export class SchoollistComponent implements OnInit {
schoollist: any[];
schooldropdown= new FormControl();
schools: School[];
  selectedSchool: School

  constructor(private schoollistService:SchoollistService, private router:Router, private schoolService: SchoolOfService) { }

  ngOnInit(){
    var varschool=this.schoollistService.getSchools();
    console.log(varschool);
    
    this.schoollistService.getSchools().subscribe((res) => this.schoollist = res);

    console.log("this school list", this.schoollist);
    this.schoolService
    .getSchools()
    .then((schools: School[]) => {
      this.schools = this.schools.map((school) => {
        if (!school.address) {
          school.address = ""
        }
        console.log("schools", schools);
        return school;
      });
    });
}
logout(){
  localStorage.removeItem('TOKEN_NUMBER');
  localStorage.removeItem('ROLE_TYPE');
  this.router.navigate(['./login']);

}

Back():void{
  this.router.navigate(['./profile']);

}
private getIndexOfSchools = (schoolId: String) => {
  return this.schools.findIndex((school) => {
    return school._id === schoolId;
  });
}

selectSchool(school: School) {
  this.selectedSchool = school
  console.log(this.selectSchool)
}

createNewSchool() {
  var school: School = {
    schoolname: '',
    address: '',
    city:'',
    state:'',
    country:''
  };

  // By default, a newly-created contact will have the selected state.
  this.selectSchool(school);
}

deleteSchool = (schoolId: String) => {
  var idx = this.getIndexOfSchools(schoolId);
  if (idx !== -1) {
    this.schools.splice(idx, 1);
    this.selectSchool(null);
  }
    return this.schools;
}

addSchool = (school: School) => {
  this.schools.push(school);
  this.selectSchool(school);
  return this.schools;
}

updateSchool = (school: School) => {
  var idx = this.getIndexOfSchools(school._id);
  if (idx !== -1) {
    this.schools[idx] = school;
    this.selectSchool(school);
  }
  return this.schools;
}
}
