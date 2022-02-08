import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RegisterFormsComponent} from'./register-form/register-forms.component';
import {LoginFormsComponent} from './login-form/loginforms.component';
import {ProfileFormsComponent} from './profile/profile-forms.component'
import { UserlistComponent } from './userlist/userlist.component';
import { RoleGuardService } from './role-guard.service';
import { ProfileGuardService } from './profile-guard.service';
import { SchoolComponent } from './school/school.component';
import { TeachersComponent } from './teachers/teachers.component';
import { CoursesComponent } from './courses/courses.component';
import { StudentsComponent } from './students/students.component';
import { HomeComponent } from './home/home.component';
import { CourselistComponent } from './courseslist/courseslist.component';
import {SchoollistComponent} from './schoolslist/schoolslist.component'
import { StudentGuardService } from './students-guard.service';
import { TeacherGuardService } from './teacher-guard.service';
import { AboutComponent } from './about/about.component';
import { ServersideComponent} from './serverside/serverside.component';
import {ClientsideComponent} from './clientside/clientside.component';
import { AdminComponent } from './adminpage/adminpage.component';
import { UsersDisplayComponent } from './usersdisplay/usersdisplay.component';
import { SchoolDisplayComponent } from './schooldisplay/schooldisplay.component';
import { CourseDisplayComponent } from './courseldisplay/coursedisplay.component';
import { EnrollmentComponent } from './enrollment/enrollment.component';
import { TeacherDetailComponent } from './teacherdetail/teacherdetail.component';
import { EnrollmentUserDisplayComponent } from './enrollmentuserdisplay/enrollmentuserdisplay.component';




const routes: Routes = [
  {path: 'home', component:HomeComponent},
  {path: 'register', component:RegisterFormsComponent},
  {path: 'login',component:LoginFormsComponent},
  {path: 'logout',component:LoginFormsComponent},
  {path: 'profile',canActivate:[ProfileGuardService],component:ProfileFormsComponent},
  {path: 'admin',canActivate:[RoleGuardService],component:AdminComponent},
  {path: 'usersdisplay',canActivate:[RoleGuardService],component:UsersDisplayComponent},
  {path: 'enrolldisplay',canActivate:[RoleGuardService],component:EnrollmentUserDisplayComponent},
  {path: 'schooldisplay',canActivate:[RoleGuardService],component:SchoolDisplayComponent},
  {path: 'coursedisplay',canActivate:[RoleGuardService],component:CourseDisplayComponent},
  {path: 'enrollment',canActivate:[RoleGuardService],component:EnrollmentComponent},
  {path: 'users',canActivate:[RoleGuardService],component:UserlistComponent},
  {path: 'students',canActivate:[StudentGuardService],component:StudentsComponent},
  {path: 'school',component:SchoollistComponent},
  {path: 'teachers',canActivate:[TeacherGuardService],component:TeachersComponent},
  {path: 'teacherdetail',canActivate:[TeacherGuardService],component:TeacherDetailComponent},
  {path: 'courses',component:CourselistComponent},
  {path: 'about',component:AboutComponent},
  {path: 'serverside',component:ServersideComponent},
  {path: 'clientside',component:ClientsideComponent},
  {path: '', redirectTo:'/home', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ useHash: true })],
  exports: [RouterModule],
  providers: [RoleGuardService,ProfileGuardService,StudentGuardService,TeacherGuardService]
})
export class AppRoutingModule { }
