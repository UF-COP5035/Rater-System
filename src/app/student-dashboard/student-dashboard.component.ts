import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Student } from '../student/student';
import { StudentService } from '../student/student.service';
import { Credentials, AuthenticationService } from '../authentication/authentication.service';

@Component({
    selector: 'app-student-dashboard',
    templateUrl: './student-dashboard.component.html',
    styleUrls: ['./student-dashboard.component.css']
})
export class StudentDashboardComponent implements OnInit {
    currentStudent: Promise<Student>;
    courses: Promise<Array<any>>;
    studentInfo: Credentials;

    constructor(
        private router: Router,
        private studentService: StudentService,
        private authService: AuthenticationService
    ) {
        this.studentInfo = this.authService.credentials();
    }

    ngOnInit() {
        this.currentStudent = this.studentService.getStudent(this.studentInfo.user_id);
        this.courses = this.studentService.getCoursesByStudent(this.studentInfo.user_id);
    }

    goToSubmitReviews(userId: string) {
        this.router.navigate(['/student-dashboard/review/']);
    }
}

