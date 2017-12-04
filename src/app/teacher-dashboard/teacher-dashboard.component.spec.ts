import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, RouterModule, Routes, Router, ParamMap, provideRoutes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpModule, XHRBackend } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import {
    MatCardModule, MatMenuModule, MatToolbarModule,
    MatIconModule, MatInputModule, MatButtonModule,
    MatFormFieldModule, MatSelectModule
} from '@angular/material';

import { TeacherDashboardComponent } from './teacher-dashboard.component';
import { TeacherService } from '../teacher/teacher.service';

class TestRouterComponent { }
const config: Routes = [
    { path: 'review', component: TestRouterComponent }
];

describe('TeacherDashboardComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [MatMenuModule, RouterModule, RouterTestingModule, HttpModule],
            providers: [TeacherService, provideRoutes(config), {
                provide: XHRBackend, useClass: MockBackend
            }],
            declarations: [
                TeacherDashboardComponent
            ]
        }).compileComponents();
    }));

    it('should create the app', async(() => {
        const fixture = TestBed.createComponent(TeacherDashboardComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));

    it('should render title in a h1 tag', async(() => {
        const fixture = TestBed.createComponent(TeacherDashboardComponent);
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('h1').textContent).toContain('Welcome');
    }));
});
