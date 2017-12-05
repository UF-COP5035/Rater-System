import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { TextboxQuestion, DropdownQuestion, ReviewQuestion, Review } from '../review';
import { QuestionControlService } from '../question-control.service';

@Component({
    selector: 'app-completed-form',
    templateUrl: './completed-form.component.html',
    styleUrls: ['./completed-form.component.css'],
    providers: [QuestionControlService]
})
export class CompletedFormComponent implements OnInit {
    @Input() questions: ReviewQuestion<any>[] = [];
    form: FormGroup;

    constructor(
        private qcs: QuestionControlService,
    ) { }

    ngOnInit() {
        this.form = this.qcs.toFormGroup(this.questions);
        this.form.disable();
    }
}
