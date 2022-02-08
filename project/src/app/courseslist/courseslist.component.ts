import { Component, OnInit } from '@angular/core';
import {CourselistService} from'./courseslist.service';
import {CourseService} from'./../course.service';
import { Course } from '../course';
import {Router} from '@angular/router'

@Component({
  selector: 'app-courseslist',
  templateUrl: './courseslist.component.html',
  styleUrls: ['./courseslist.component.css'],
  providers:[CourselistService]
})
export class CourselistComponent implements OnInit {
courselist: any[];
courses: Course[]
  selectedCourse: Course

  constructor(private courselistService:CourselistService, private router:Router, private courseService: CourseService) { }

  ngOnInit(){
    
    this.courselistService.getCourses()
        .subscribe((res) => this.courselist = res);
    console.log("this course list", this.courselist);
    this.courseService
    .getCourses()
    .then((courses: Course[]) => {
      this.courses = this.courses.map((course) => {
        if (!course.teacher) {
          course.teacher = ""
        }
        console.log("courses", this.courses);
        return course;
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
private getIndexOfCourses = (courseId: String) => {
  return this.courses.findIndex((course) => {
    return course._id === courseId;
  });
}

selectCourse(course: Course) {
  this.selectedCourse = course
  console.log(this.selectCourse)
}

createNewCourse() {
  var course: Course = {
    coursename: '',
    credit:'',
    dates: '',
    teacher:''
  };

  // By default, a newly-created contact will have the selected state.
  this.selectCourse(course);
}

deleteCourse = (courseId: String) => {
  var idx = this.getIndexOfCourses(courseId);
  if (idx !== -1) {
    this.courses.splice(idx, 1);
    this.selectCourse(null);
  }
    return this.courses;
}

addCourse = (course: Course) => {
  this.courses.push(course);
  this.selectCourse(course);
  return this.courses;
}

updateCourse = (course: Course) => {
  console.log(course);
  var idx = this.getIndexOfCourses(course._id);
  if (idx !== -1) {
    this.courses[idx] = course;
    this.selectCourse(course);
  }
    return this.courses;
}
}
