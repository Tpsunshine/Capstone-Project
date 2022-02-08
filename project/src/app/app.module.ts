//modules
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {HttpModule} from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import {DemoMaterialModule} from './../app/material-module';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';
import {MatNativeDateModule} from '@angular/material/core';
import { DataTablesModule } from 'angular-datatables';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';

// components
import { AppComponent } from './app.component';
import {LoginFormsComponent} from './login-form/loginforms.component';
import {RegisterFormsComponent} from './register-form/register-forms.component';
import {ProfileFormsComponent} from './profile/profile-forms.component';
import { UserlistComponent } from './userlist/userlist.component';
import { ContactDetailsComponent } from './contact-details/contact-details.component';
import { CoursesComponent } from './courses/courses.component';
import { TeachersComponent } from './teachers/teachers.component';
import { SchoolComponent } from './school/school.component';
import { StudentsComponent } from './students/students.component';
import { HomeComponent } from './home/home.component';
import { CourselistComponent } from './courseslist/courseslist.component';
import { SchoollistComponent } from './schoolslist/schoolslist.component';
import { AboutComponent } from './about/about.component';
import { ServersideComponent } from './serverside/serverside.component';
import { ClientsideComponent } from './clientside/clientside.component';
import { AdminComponent } from './adminpage/adminpage.component';
import { UsersDisplayComponent } from './usersdisplay/usersdisplay.component';
import { SchoolDisplayComponent } from './schooldisplay/schooldisplay.component';
import { CourseDisplayComponent } from './courseldisplay/coursedisplay.component';
import { TeacherDetailComponent } from './teacherdetail/teacherdetail.component';





//services
import {LoginFormPosterService} from './login-form/loginformPoster.service';
import {RegisterFormPosterService} from './register-form/register-formPoster.service';
import { ProfileFormPosterService } from './profile/profilePoster.service';
import { UserlistService } from './userlist/userlist.service';
import { ContactService } from './contact.service';
//import { CoursesService } from './courses/course.service-bak';
import { CourseService} from './course.service'
import { CourselistService } from './courseslist/courseslist.service';
import { SchoollistService } from './schoolslist/schoolslist.service';
//import { SchoolService } from './school/school.service';
import { SchoolOfService } from './school.service';
import { FilterPipe } from './teachers/teacher.pipe';

import { userDisplayPipe } from './usersdisplay/usersdisplay.pipe';

import { schoolDisplayPipe } from './schooldisplay/schooldisplay.pipe';
import { courseDisplayPipe } from './courseldisplay/coursedisplay.pipe';
import { EnrollmentComponent } from './enrollment/enrollment.component';
import { StudentsFilterPipe } from './students/students.pipe';

import { TeacherDetailService } from './teacherdetail/teacherdetail.service';
import { enrollmentUserDisplayPipe } from './enrollmentuserdisplay/enrollmentuserdisplay.pipe';
import { EnrollmentUserDisplayComponent } from './enrollmentuserdisplay/enrollmentuserdisplay.component';






//import { ReactiveformComponent } from './reactiveform/reactiveform.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginFormsComponent,
    RegisterFormsComponent,
    ProfileFormsComponent,
    UserlistComponent,
    ContactDetailsComponent,
    SchoolComponent,
    TeachersComponent,
    CoursesComponent,
    StudentsComponent,
    HomeComponent,
    CourselistComponent, 
    SchoollistComponent, 
    AboutComponent, 
    ServersideComponent, 
    ClientsideComponent, 
    AdminComponent,
    FilterPipe,
    UsersDisplayComponent,
    userDisplayPipe,
    SchoolDisplayComponent,
    schoolDisplayPipe,
    CourseDisplayComponent,
    courseDisplayPipe,
    EnrollmentComponent,
    StudentsFilterPipe,
    TeacherDetailComponent,
    enrollmentUserDisplayPipe,
    EnrollmentUserDisplayComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    HttpModule,
    DemoMaterialModule,
    MatNativeDateModule,
    BrowserAnimationsModule,
    DataTablesModule,
    NgbModule
    

    //ReactiveFormsModule
  ],
  providers: [
    LoginFormPosterService,
    RegisterFormPosterService,
    ProfileFormPosterService,
    UserlistService,
    ContactService,
    //CoursesService,
    CourseService,
    CourselistService,
    //SchoolService,
    SchoollistService,
    SchoolOfService,
    TeacherDetailService,
    
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' }}
  ],
  exports: [FilterPipe, userDisplayPipe, schoolDisplayPipe, courseDisplayPipe, StudentsFilterPipe, enrollmentUserDisplayPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
