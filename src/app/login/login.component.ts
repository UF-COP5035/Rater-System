import { Component, OnInit, Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Headers, Http } from '@angular/http';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MatToolbarModule } from '@angular/material';

import { AdministratorService } from '../administrator/administrator.service';
import { TeacherService } from '../teacher/teacher.service';
import { StudentService } from '../student/student.service';
import { Administrator } from '../administrator/administrator';
import { Teacher } from '../teacher/teacher';
import { Student } from '../student/student';


import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    hide = true;
    student: Student;
    teachers: Teacher[] = [];
    administrators: Administrator[] = [];

    constructor(private teacherService: TeacherService,
        private administratorService: AdministratorService,
        private studentService: StudentService,
        private router: Router
    ) { }

    ngOnInit() {
    }

    login(userType: string, userName: string) {
        if (userType === 'student') {
            this.studentService.getStudentByUsername(userName)
                .then((student) => {
                    this.student = student;
                    this.router.navigate(['/student-dashboard/', this.student._id]);
                })
                .catch((err) => {
                    console.error(err);
                });
        } else if (userType === 'teacher') {
            this.router.navigate(['/teacher-dashboard']);
        } else if (userType === 'administrator') {
            this.router.navigate(['/admin-dashboard']);
        } else {
            this.router.navigate(['']);
        }
    }


}