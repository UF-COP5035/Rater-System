import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatFormFieldModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { DynamicFormComponent } from './dynamic-form.component';
import { ReviewService } from '../review.service';
import { CourseService } from '../../course/course.service';
import { TeacherService } from '../../teacher/teacher.service';

describe('DynamicFormComponent', () => {
    let component: DynamicFormComponent;
    let fixture: ComponentFixture<DynamicFormComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [ReactiveFormsModule, MatFormFieldModule, HttpModule],
            declarations: [DynamicFormComponent],
            providers: [ReviewService, CourseService, TeacherService],
            schemas: [NO_ERRORS_SCHEMA],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DynamicFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
