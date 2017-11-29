import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
    MatCardModule, MatMenuModule, MatToolbarModule, MatIconModule, MatInputModule,
    MatButtonModule, MatFormFieldModule, MatSelectModule, MatTabsModule, MatExpansionModule
} from '@angular/material';
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
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { DynamicFormQuestionComponent } from './review/dynamic-form-question/dynamic-form-question.component';
import { DynamicFormComponent } from './review/dynamic-form/dynamic-form.component';

const appRoutes: Routes = [
    { path: 'student-dashboard/:_id', component: StudentDashboardComponent },
    { path: 'teacher-dashboard/:_id', component: TeacherDashboardComponent },
    { path: 'admin-dashboard', component: AdminDashboardComponent },
    { path: 'student-dashboard/review/:_id', component: ReviewComponent },
    { path: 'review/:_id', component: ReviewComponent },
    { path: 'login', component: LoginComponent },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: '**', component: PageNotFoundComponent }
];


@NgModule({
    declarations: [
        AppComponent,
        StudentDashboardComponent,
        TeacherDashboardComponent,
        AdminDashboardComponent,
        LoginComponent,
        ReviewComponent,
        PageNotFoundComponent,
        DynamicFormQuestionComponent,
        DynamicFormComponent,
    ],
    imports: [
        RouterModule.forRoot(
            appRoutes,
            { enableTracing: true } // <-- debugging purposes only
        ),
        BrowserModule,
        ReactiveFormsModule,
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
        MatSelectModule,
        MatTabsModule,
        MatExpansionModule
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
