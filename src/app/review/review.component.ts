import { MatFormFieldModule, MatTabsModule, MatToolbarModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { Component, OnInit, Injectable, Input } from '@angular/core';
import { ActivatedRoute, RouterModule, Routes, Router, ParamMap, Params } from '@angular/router';

import { MatExpansionModule, MatExpansionPanelTitle } from '@angular/material/expansion';

import { StudentService } from '../student/student.service';
import { ReviewService } from './review.service';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';


@Component({
    selector: 'app-review',
    templateUrl: './review.component.html',
    styleUrls: ['./review.component.css'],
})
export class ReviewComponent implements OnInit {
    // Gathering Review information

    // Temporarily force a student user type
    // TODO: Update to use user session
    userType = 1;

    userID: string;
    user: Promise<any>;
    courses: Promise<Array<any>>;
    reviews: Promise<Array<any>>;
    coursesToBeReviewed: Promise<Array<any>>;
    questions: any[];

    constructor(
        private studentService: StudentService,
        private reviewService: ReviewService,
        private route: ActivatedRoute,
        private router: Router,
    ) {
        this.route.params.subscribe(params => this.userID = params._id);
    }

    selectedValue: string;

    ngOnInit(): void {
        if (this.userType === 1) { // Student user type
            this.user = this.studentService.getStudent(this.userID);
            Promise.all([
                this.courses = this.studentService.getCoursesByStudent(this.userID),
                this.reviews = this.studentService.getReviewsByStudent(this.userID),
            ]).then(data => {
                const courses = data[0];
                const reviews = data[1];
                const coursesToBeReviewed = [];
                courses.forEach(course => {
                    if (typeof (reviews.find(reviewedCourse => reviewedCourse.course_code === course.course_code)) === 'undefined') {
                        coursesToBeReviewed.push(course);
                    }
                });
                this.coursesToBeReviewed = Promise.resolve(coursesToBeReviewed);
            });
            this.questions = this.reviewService.getQuestions();
        } else { // Other user types

        }
    }

    goBack(): void {
        this.router.navigate(['/student-dashboard/', this.userID]);
    }

}
