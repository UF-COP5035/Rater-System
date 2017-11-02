import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
<<<<<<< HEAD
import { MatCardModule, MatMenuModule, MatToolbarModule, MatIconModule, MatInputModule, MatButtonModule, MatFormFieldModule, MatSelectModule, MatTabsModule } from '@angular/material';
=======
import { MatCardModule, MatMenuModule, MatToolbarModule, MatIconModule, MatInputModule, MatButtonModule, MatFormFieldModule, MatSelectModule } from '@angular/material';
>>>>>>> d71f38f0842ba4bbe1a63c369b8cb50d602c7c7b
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';

// Import the Http Module and our Data Service
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';
import { TeacherDashboardComponent } from './teacher-dashboard/teacher-dashboard.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { LoginComponent } from './login/login.component';
import { ReviewComponent } from './review/review.component';
import { ReviewService } from './review/review.service';
import { CourseService } from './course/course.service';
import { StudentService } from './student/student.service';
import { TeacherService } from './teacher/teacher.service';
import { AdministratorService } from './administrator/administrator.service';


const appRoutes: Routes = [
  { path: 'student-dashboard', component: StudentDashboardComponent },
  { path: 'teacher-dashboard', component: TeacherDashboardComponent },
  { path: 'admin-dashboard', component: AdminDashboardComponent },
  {
    path: 'review',
    component: ReviewComponent,
    data: { title: 'Review' }
  },
  { path: 'login', component: LoginComponent },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  }

];


@NgModule({
  declarations: [
    AppComponent,
    StudentDashboardComponent,
    TeacherDashboardComponent,
    AdminDashboardComponent,
    LoginComponent,
    ReviewComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    BrowserModule,
    HttpModule,          // <-Add HttpModule'
    BrowserAnimationsModule, // <- Add Angular Animation
    MatButtonModule,         // <- Add Angular Material
    MatMenuModule,
    MatCardModule,
    FormsModule,
    MatToolbarModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule, 
    MatSelectModule

  ],
  providers: [
    ReviewService,
    CourseService,
    StudentService,
    TeacherService,
    AdministratorService
  ], // <-Add Services
  bootstrap: [AppComponent]
})
export class AppModule { }
