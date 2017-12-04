import { MatFormFieldModule, MatTabsModule, MatToolbarModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { Component, OnInit, Injectable, Input } from '@angular/core';
import { ActivatedRoute, RouterModule, Routes, Router, ParamMap, Params } from '@angular/router';

import { MatExpansionModule, MatExpansionPanelTitle } from '@angular/material/expansion';

import { StudentService } from '../student/student.service';
import { TeacherService } from '../teacher/teacher.service';
import { AdministratorService} from '../administrator/administrator.service';
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
    userType: number;

    userID: string;
    userURL: string;
    user: Promise<any>;
    courses: Promise<Array<any>>;
    reviews: Promise<Array<any>>;
    coursesToBeReviewed: Promise<Array<any>>;
    coursesReviewed: Promise<Array<any>>;
    questions: any[];

    constructor(
        private studentService: StudentService,
        private teacherService: TeacherService,
        private administratorService: AdministratorService,
        private reviewService: ReviewService,
        private route: ActivatedRoute,
        private router: Router,
    ) {
        this.route.params.subscribe(params => this.userID = params._id);
        this.route.url.subscribe(url => this.userURL);
    }

    selectedValue: string;

    ngOnInit(): void {
        if(this.router.url.indexOf('student') > 0){
                     this.userType =1;
                     this.userURL = '/student-dashboard/';
        }else if (this.router.url.indexOf('teacher') > 0){
            this.userType = 2;
            this.userURL = '/teacher-dashboard/';
        } else if (this.router.url.indexOf('admin') > 0){
            this.userType = 3;
            this.userURL = '/admin-dashboard/';
        } else {
            this.userType = 100;
            this.userURL = '';
        }

        if (this.userType === 1) { // Student user type
            this.user = this.studentService.getStudent(this.userID);
            Promise.all([
                this.courses = this.studentService.getCoursesByStudent(this.userID),
                this.reviews = this.studentService.getReviewsByStudent(this.userID),
            ]).then(data => {
                const courses = data[0];
                const reviews = data[1];
                const coursesToBeReviewed = [];
                const coursesReviewed = [];
                courses.forEach(course => {
                    if (typeof (reviews.find(reviewedCourse => reviewedCourse.course_code === course.course_code)) === 'undefined') {
                        coursesToBeReviewed.push(course);
                    } else {
                        coursesReviewed.push({
                            course: course,
                            review: reviews.find(reviewedCourse => reviewedCourse.course_code === course.course_code)
                        });
                    }
                });
                this.coursesToBeReviewed = Promise.resolve(coursesToBeReviewed);
                this.coursesReviewed = Promise.resolve(coursesReviewed);
            });
            this.questions = this.reviewService.getQuestions();
        } else if(this.userType == 2){
            this.user = this.teacherService.getTeacher(this.userID);
            Promise.all([
                this.reviews = this.teacherService.getReviewsByTeacher(this.userID),
            ]).then(data => {
                
                const courses = data[0];
                const coursesToBeReviewed = [];
                const coursesReviewed = [];
                courses.forEach(course => {
                    if (typeof (courses.find(reviewedCourse => reviewedCourse.course_code === course.course_code)) != 'undefined') {
                       coursesReviewed.push({
                            course: course,
                            review: course, 
                        });
                    }
                });
                this.coursesReviewed = Promise.resolve(coursesReviewed);
            });
            this.questions = this.reviewService.getQuestions();

        } else if(this.userType == 3){
            this.user = this.administratorService.getAdministrator(this.userID);
            Promise.all([
                this.reviews = this.administratorService.getReviewsByAdministrator(this.userID),
            ]).then(data => {
                
                const courses = data[0];
                const coursesToBeReviewed = [];
                const coursesReviewed = [];
                courses.forEach(course => {
                    if (typeof (courses.find(reviewedCourse => reviewedCourse.course_code === course.course_code)) != 'undefined') {
                       coursesReviewed.push({
                            course: course,
                            review: course, 
                        });
                    }
                });
                this.coursesReviewed = Promise.resolve(coursesReviewed);
            });
            this.questions = this.reviewService.getQuestions();
        }else { // Other user types
        }
    }

    goBack(): void {
        this.router.navigate([this.userURL, this.userID]);
    }

}