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

import { AdminDashboardComponent } from './../admin-dashboard.component';
import { AdministratorService } from '../../administrator/administrator.service';
import { AuthenticationService } from '../../authentication/authentication.service';
import { StudentService } from '../../student/student.service';
import { TeacherService } from '../../teacher/teacher.service';
import { ConfirmDialogService } from '../../confirm-dialog/confirm-dialog.service';

import { AdminCreateComponent } from './admin-create.component';

describe('AdminCreateComponent', () => {
  let component: AdminCreateComponent;
  let fixture: ComponentFixture<AdminCreateComponent>;
 
  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [ MatFormFieldModule, HttpModule],
        declarations: [AdminCreateComponent],
        providers: [StudentService, AdministratorService, AuthenticationService, TeacherService, ConfirmDialogService],
    })
        .compileComponents();
}));

beforeEach(() => {
    fixture = TestBed.createComponent(AdminCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
});
});
