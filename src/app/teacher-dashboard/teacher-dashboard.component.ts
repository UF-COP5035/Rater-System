import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Teacher } from '../teacher/teacher';
import { TeacherService } from '../teacher/teacher.service';
import { AuthenticationService, Credentials } from '../authentication/authentication.service';

@Component({
    selector: 'app-teacher-dashboard',
    templateUrl: './teacher-dashboard.component.html',
    styleUrls: ['./teacher-dashboard.component.css']
})
export class TeacherDashboardComponent implements OnInit {
    currentTeacher: Promise<Teacher>;
    courses: Promise<Array<any>>;
    teacherInfo: Credentials;

    constructor(
        private router: Router,
        private teacherService: TeacherService,
        private authService: AuthenticationService
    ) {
        this.teacherInfo = this.authService.credentials();
    }

    ngOnInit() {
        this.currentTeacher = this.teacherService.getTeacher(this.teacherInfo.user_id);
        this.courses = this.teacherService.getCoursesByTeacher(this.teacherInfo.user_id);
    }
    goToSubmitReviews(userId: string) {
        this.router.navigate(['/teacher-dashboard/review/']);
    }
}

