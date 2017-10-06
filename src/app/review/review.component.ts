import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { MdFormFieldModule } from '@angular/material';
import { Location } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { Teacher } from '../teacher/teacher';
import { TeacherService } from '../teacher/teacher.service';

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
