import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { DynamicFormQuestionComponent } from './dynamic-form-question.component';
import { ReviewQuestion, TextboxQuestion } from '../review';

describe('DynamicFormQuestionComponent', () => {
    let component: DynamicFormQuestionComponent;
    let fixture: ComponentFixture<DynamicFormQuestionComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, BrowserAnimationsModule],
            declarations: [DynamicFormQuestionComponent],
            providers: [],
            schemas: [NO_ERRORS_SCHEMA],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DynamicFormQuestionComponent);
        component = fixture.componentInstance;

        const testControl = {
            'testQuestion': new FormControl('test answer')
        };
        component.form = new FormGroup(testControl);
        component.question =
            new TextboxQuestion({
                label: 'Test Question',
                question: 'testQuestion',
                required: true,
                order: 1
            });
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
