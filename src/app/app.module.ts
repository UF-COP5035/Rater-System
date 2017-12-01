import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
    MatCardModule, MatMenuModule, MatToolbarModule, MatIconModule, MatInputModule, MatDialogModule,
    MatButtonModule, MatFormFieldModule, MatSelectModule, MatTabsModule, MatExpansionModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';

// Services
import { ReviewService } from './review/review.service';
import { CourseService } from './course/course.service';
import { StudentService } from './student/student.service';
import { TeacherService } from './teacher/teacher.service';
import { AdministratorService } from './administrator/administrator.service';
import { AuthenticationService } from './authentication/authentication.service';
import { AuthenticationGuard } from './authentication/authentication.guard';

// Components
import { AppComponent } from './app.component';
import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';
import { TeacherDashboardComponent } from './teacher-dashboard/teacher-dashboard.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { LoginComponent } from './login/login.component';
import { ReviewComponent } from './review/review.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { DynamicFormQuestionComponent } from './review/dynamic-form-question/dynamic-form-question.component';
import { DynamicFormComponent } from './review/dynamic-form/dynamic-form.component';
import { CompletedFormComponent } from './review/completed-form/completed-form.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { ConfirmDialogService } from './confirm-dialog/confirm-dialog.service';

const appRoutes: Routes = [
    { path: 'admin-dashboard/review', component: ReviewComponent },
    { path: 'teacher-dashboard/review', component: ReviewComponent },
    { path: 'student-dashboard/review', component: ReviewComponent },
    { path: 'student-dashboard', component: StudentDashboardComponent },
    { path: 'teacher-dashboard', component: TeacherDashboardComponent },
    { path: 'admin-dashboard', component: AdminDashboardComponent },
    { path: 'login', component: LoginComponent },
    { path: '', canActivate: [AuthenticationGuard], redirectTo: '/login', pathMatch: 'full' },
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
        CompletedFormComponent,
        ConfirmDialogComponent
    ],
    imports: [
        RouterModule.forRoot(
            appRoutes,
            { enableTracing: true }
        ),
        BrowserModule,
        ReactiveFormsModule,
        HttpModule,
        BrowserAnimationsModule,
        FormsModule,
        MatButtonModule,
        MatMenuModule,
        MatCardModule,
        MatToolbarModule,
        MatInputModule,
        MatFormFieldModule,
        MatIconModule,
        MatSelectModule,
        MatTabsModule,
        MatExpansionModule,
        MatDialogModule
    ],
    providers: [
        ReviewService,
        CourseService,
        StudentService,
        TeacherService,
        AdministratorService,
        AuthenticationService,
        AuthenticationGuard,
        ConfirmDialogService
    ],
    entryComponents: [
        ConfirmDialogComponent
    ],
    bootstrap: [AppComponent],
})
export class AppModule { }
