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

import { AdminDashboardComponent } from './admin-dashboard.component';
import { AdministratorService } from '../administrator/administrator.service';
import { AuthenticationService } from '../authentication/authentication.service';
import { StudentService } from '../student/student.service';
import { TeacherService } from '../teacher/teacher.service';

class TestRouterComponent { }
const config: Routes = [
    { path: 'review', component: TestRouterComponent }
];

describe('AdminDashboardComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [MatMenuModule, RouterModule, RouterTestingModule, HttpModule],
            providers: [AuthenticationService, AdministratorService, StudentService,
                TeacherService, provideRoutes(config), {
                    provide: XHRBackend, useClass: MockBackend
                }],
            declarations: [
                AdminDashboardComponent
            ]
        }).compileComponents();
    }));

    it('should create the app', async(() => {
        const fixture = TestBed.createComponent(AdminDashboardComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));
});
