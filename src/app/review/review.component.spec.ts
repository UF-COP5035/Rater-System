import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatInputModule, MatFormFieldModule, MatTabsModule } from '@angular/material';

import { ActivatedRoute, RouterModule, Routes } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule, Http, Response, ResponseOptions, XHRBackend } from '@angular/http';

import { ReviewComponent } from './review.component';
import { TeacherService } from '../teacher/teacher.service';

const appRoutes: Routes = [
    { path: '', redirectTo: '/', pathMatch: 'full' },
    { path: 'review', component: ReviewComponent, data: { title: 'Review' } }
];

describe('ReviewComponent', () => {
    let component: ReviewComponent;
    let fixture: ComponentFixture<ReviewComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({

            imports: [BrowserAnimationsModule, MatFormFieldModule, MatInputModule, MatTabsModule, RouterModule.forRoot(appRoutes), HttpModule],

            declarations: [ReviewComponent],
            providers: [TeacherService, { provide: APP_BASE_HREF, useValue: '/' }]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ReviewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
