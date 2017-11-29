import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material';

import { ReviewQuestion } from '../review';

@Component({
    selector: 'app-question',
    templateUrl: './dynamic-form-question.component.html'
})
export class DynamicFormQuestionComponent {
    @Input() question: ReviewQuestion<any>;
    @Input() form: FormGroup;
    get isValid() { return this.form.controls[this.question.question].valid; }
}
