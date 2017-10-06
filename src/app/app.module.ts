import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdButtonModule, MdCardModule, MdMenuModule, MdToolbarModule, MdIconModule, MdInputModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';

// Import the Http Module and our Data Service
import { HttpModule } from '@angular/http';
import { DataService } from './data.service';
import { SurveyComponent } from './survey/survey.component';
import { TeacherService } from './teacher-detail/teacher.service';
import { AppComponent } from './app.component';
import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';
import { TeacherDashboardComponent } from './teacher-dashboard/teacher-dashboard.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { LoginComponent } from './login/login.component';

const appRoutes: Routes = [
  { path: 'student-dashboard', component: StudentDashboardComponent},
  { path: 'teacher-dashboard', component: TeacherDashboardComponent},
  { path: 'admin-dashboard', component: AdminDashboardComponent}, 
  {
    path: 'survey',
    component: SurveyComponent,
    data: { title: 'Survey' }
  },
  { path: 'login', component: LoginComponent},
  {
    path: '',
    redirectTo: '/',
    pathMatch: 'full'
  }
 
];


@NgModule({
  declarations: [
    AppComponent,
    SurveyComponent,
    StudentDashboardComponent,
    TeacherDashboardComponent,
    AdminDashboardComponent,
    LoginComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    BrowserModule,
    HttpModule,          // <-Add HttpModule'
    BrowserAnimationsModule, // <- Add Angular Animation
    MdButtonModule,         // <- Add Angular Material
    MdMenuModule,
    MdCardModule,
    FormsModule,
    MdToolbarModule,
    MdInputModule,
    MdIconModule

  ],
  providers: [DataService, TeacherService], // <-Add DataService
  bootstrap: [AppComponent]
})
export class AppModule { }
