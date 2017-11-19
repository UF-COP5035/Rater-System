import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { TextboxQuestion, DropdownQuestion, ReviewQuestion, Review } from '../review';
import { ReviewService } from '../review.service';
import { CourseService } from '../../course/course.service';
import { TeacherService } from '../../teacher/teacher.service';
import { Student } from '../../student/student';
import { QuestionControlService } from '../question-control.service';

@Component({
    selector: 'app-dynamic-form',
    templateUrl: './dynamic-form.component.html',
    providers: [QuestionControlService]
})
export class DynamicFormComponent implements OnInit {

    @Input() userID;
    @Input() course_code;
    @Input() teacher_name;
    @Input() questions: ReviewQuestion<any>[] = [];
    form: FormGroup;
    userInput;

    constructor(
        private qcs: QuestionControlService,
        private reviewService: ReviewService,
        private courseService: CourseService,
        private teacherService: TeacherService,
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
            });
    }
}
