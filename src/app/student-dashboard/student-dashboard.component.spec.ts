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

import { StudentDashboardComponent } from './student-dashboard.component';
import { StudentService } from '../student/student.service';
import { AuthenticationService } from '../authentication/authentication.service';
import { TeacherService } from '../teacher/teacher.service';
import { AdministratorService } from '../administrator/administrator.service';

class TestRouterComponent { }
const config: Routes = [
    { path: 'review', component: TestRouterComponent }
];

describe('StudentDashboardComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [MatMenuModule, RouterModule, RouterTestingModule, HttpModule],
            providers: [AuthenticationService, StudentService, TeacherService, AdministratorService, provideRoutes(config), {
                provide: XHRBackend, useClass: MockBackend
            }],
            declarations: [
                StudentDashboardComponent
            ]
        }).compileComponents();
    }));

    it('should create the app', async(() => {
        const fixture = TestBed.createComponent(StudentDashboardComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));
});
