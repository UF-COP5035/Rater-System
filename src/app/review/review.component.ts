<<<<<<< HEAD
import { MatFormFieldModule, MatTabsModule } from '@angular/material';
import { Location } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


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

=======
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { MatFormFieldModule } from '@angular/material';
import { Location } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { Teacher } from '../teacher/teacher';
import { TeacherService } from '../teacher/teacher.service';
>>>>>>> d71f38f0842ba4bbe1a63c369b8cb50d602c7c7b

@Component({
    selector: 'app-review',
    templateUrl: './review.component.html',
    styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
    // Gathering Teacher information

    teachers: Teacher[] = [];

    constructor(private teacherService: TeacherService,
        private route: ActivatedRoute,
        private location: Location
    ) { }

    ngOnInit(): void {
        this.teacherService.getTeachers()
            .then(teachers => this.teachers = teachers.slice(1, 5));
    }
    goBack(): void {
        this.location.back();
    }

}
