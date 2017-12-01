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
import { AuthenticationService } from '../authentication/authentication.service';
import { StudentService } from '../student/student.service';
import { AdministratorService } from '../administrator/administrator.service';

class TestRouterComponent { }
const config: Routes = [
    { path: 'review', component: TestRouterComponent }
];

describe('TeacherDashboardComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [MatMenuModule, RouterModule, RouterTestingModule, HttpModule],
            providers: [AuthenticationService, StudentService, AdministratorService, TeacherService, provideRoutes(config), {
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
});
