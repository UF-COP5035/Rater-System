import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ReviewQuestion } from './review';

@Injectable()
export class QuestionControlService {
    constructor() { }

    toFormGroup(review_questions: ReviewQuestion<any>[]) {
        const group: any = {};

        review_questions.forEach(review_question => {
            group[review_question.question] = review_question.required ?
                new FormControl(review_question.answer || '', Validators.required) : new FormControl(review_question.answer || '');
        });
        return new FormGroup(group);
    }
}
