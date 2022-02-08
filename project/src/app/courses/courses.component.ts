import { Component, OnInit, Input } from '@angular/core';
import { Course } from '../course';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CourseService } from '../course.service';

@Component({
  selector: 'courses-details',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent {

  

  @Input()
  course: Course;

  @Input()
  createHandler: Function;
  @Input()
  updateHandler: Function;
  @Input()
  deleteHandler: Function;
  constructor (private courseService: CourseService, private http: HttpClient, private router:Router) {}

  createCourse(course: Course) {
    this.courseService.createCourse(course).then((newCourse: Course) => {
      this.createHandler(newCourse);
    });
    
  }
 // updateContact(_id: string,contact:Contact): Observable<Object> {
 //   console.log("contact id ",`${contact}`)
 //       console.log("id: `${_id}`",_id["_id"], "url: ", this.editurl+"/"+_id["_id"]);
//
 //   return this.http.put(`${this.editurl}`, _id);
 // }
  updateCourse(course: Course): void {
    this.courseService.updateCourse(course).then((updatedCourse: Course) => {
      this.updateHandler(updatedCourse);
    }); 
    
  }

  deleteCourse(courseId: String): void {
    this.courseService.deleteCourse(courseId).then((deletedCourseId: String) => {
      this.deleteHandler(deletedCourseId);
    });
    
  }
}
