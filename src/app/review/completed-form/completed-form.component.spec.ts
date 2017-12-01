import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatFormFieldModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CompletedFormComponent } from './completed-form.component';

describe('CompletedFormComponent', () => {
    let component: CompletedFormComponent;
    let fixture: ComponentFixture<CompletedFormComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [ReactiveFormsModule, MatFormFieldModule, HttpModule],
            declarations: [CompletedFormComponent],
            schemas: [NO_ERRORS_SCHEMA],

        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CompletedFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
