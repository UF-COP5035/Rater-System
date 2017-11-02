import { async, ComponentFixture, TestBed } from '@angular/core/testing';
<<<<<<< HEAD
import { MatInputModule, MatFormFieldModule, MatTabsModule } from '@angular/material';
=======
import { MatInputModule, MatFormFieldModule } from '@angular/material';
>>>>>>> d71f38f0842ba4bbe1a63c369b8cb50d602c7c7b
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
<<<<<<< HEAD
            imports: [BrowserAnimationsModule, MatFormFieldModule, MatInputModule, MatTabsModule, RouterModule.forRoot(appRoutes), HttpModule],
=======
            imports: [BrowserAnimationsModule, MatFormFieldModule, MatInputModule, RouterModule.forRoot(appRoutes), HttpModule],
>>>>>>> d71f38f0842ba4bbe1a63c369b8cb50d602c7c7b
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
