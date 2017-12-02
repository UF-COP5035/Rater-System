import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material';

import { TextboxQuestion, DropdownQuestion, ReviewQuestion, Review } from '../review';
import { ReviewService } from '../review.service';
import { CourseService } from '../../course/course.service';
import { TeacherService } from '../../teacher/teacher.service';
import { Student } from '../../student/student';
import { QuestionControlService } from '../question-control.service';

@Component({
    selector: 'app-dynamic-form',
    templateUrl: './dynamic-form.component.html',
    styleUrls: ['./dynamic-form.component.css'],
    providers: [QuestionControlService]
})
export class DynamicFormComponent implements OnInit {

    @Input() userID;
    @Input() course_code;
    @Input() questions: ReviewQuestion<any>[] = [];
    form: FormGroup;
    userInput;
    dynamicFormDialogRef: MatDialogRef<DynamicFormDialogComponent>;

    constructor(
        private qcs: QuestionControlService,
        private reviewService: ReviewService,
        private courseService: CourseService,
        private teacherService: TeacherService,
        private dialog: MatDialog
    ) { }

    ngOnInit() {
        this.form = this.qcs.toFormGroup(this.questions);
    }

    onSubmit() {
        this.userInput = this.form.value;
        const reviewQuestions: ReviewQuestion<any>[] = [];

        Object.keys(this.userInput).forEach(question => {
            const reviewQuestion = new TextboxQuestion({
                question: question,
                answer: this.userInput[question],
            });
            reviewQuestions.push(reviewQuestion);
        });

        this.courseService.getCourseByCode(this.course_code)
            .then(foundCourse => {
                const newReview = new Review(this.userID, foundCourse.teacher_id, foundCourse._id, reviewQuestions);
                this.reviewService.createReview(newReview);
            })
            .then(res => {
                this.dynamicFormDialogRef = this.dialog.open(DynamicFormDialogComponent);
            })
            .catch(err => {
                console.error(err);
            });
    }
}

@Component({
    template:
        `<h1 mat-dialog-title>Submitted</h1>
         <mat-dialog-content>
            Your review was successfully submitted
        </mat-dialog-content>
        <mat-dialog-actions>
            <button mat-button mat-dialog-close>OK</button>
        </mat-dialog-actions>`
})
export class DynamicFormDialogComponent { }
