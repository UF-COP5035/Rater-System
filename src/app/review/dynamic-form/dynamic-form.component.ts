import { Component, Input, OnInit, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { Student } from '../../student/student';
import { TextboxQuestion, DropdownQuestion, ReviewQuestion, Review } from '../review';
import { ReviewService } from '../review.service';
import { CourseService } from '../../course/course.service';
import { TeacherService } from '../../teacher/teacher.service';
import { QuestionControlService } from '../question-control.service';
import { ConfirmDialogService } from '../../confirm-dialog/confirm-dialog.service';

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
    result: any;
    reviewQuestions: ReviewQuestion<any>[] = [];

    constructor(
        private qcs: QuestionControlService,
        private reviewService: ReviewService,
        private courseService: CourseService,
        private teacherService: TeacherService,
        private router: Router,
        private dialogService: ConfirmDialogService
    ) { }

    ngOnInit() {
        this.form = this.qcs.toFormGroup(this.questions);
        console.log(this.userID);
    }

    onSubmit() {
        this.userInput = this.form.value;
        console.log(this.userInput);

        Object.keys(this.userInput).forEach(question => {
            const reviewQuestion = new TextboxQuestion({
                question: question,
                answer: this.userInput[question],
            });
            this.reviewQuestions.push(reviewQuestion);
        });

        this.openDialog();
    }

    public openDialog() {
        this.dialogService
            .confirm('Submit Review', 'Are you sure you want to submit the review?')
            .subscribe(res => {
                this.courseService.getCourseByCode(this.course_code)
                    .then(foundCourse => {
                        const newReview = new Review(this.userID, foundCourse.teacher_id, foundCourse._id, this.reviewQuestions);
                        this.reviewService.createReview(newReview);
                    })
                    .catch(err => {
                        console.error(err);
                    });
            });
    }
}
