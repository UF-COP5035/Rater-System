import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule, Routes, Router, ParamMap, Params } from '@angular/router';
import { AdministratorService } from '../../administrator/administrator.service';
import { MatToolbarModule, MatCheckboxModule } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Administrator } from '../../administrator/administrator';
import { Student } from '../../student/student';
import { StudentService } from '../../student/student.service';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import { MatFormFieldModule } from '@angular/material';
import { ConfirmDialogService } from '../../confirm-dialog/confirm-dialog.service';


import { AuthenticationService, Credentials } from '../../authentication/authentication.service';


@Component({
    selector: 'app-admin-create',
    templateUrl: './admin-create.component.html',
    styleUrls: ['./admin-create.component.css']
})
export class AdminCreateComponent implements OnInit {

    currentAdministrator: Promise<Administrator>;
    courses: Promise<Array<any>>;
    administratorID: string;
    theCheckbox: FormGroup;
    newStudent: Student;
    adminInfo: Credentials;
    review_id: string[];
    course_id: string[];
    UserName: string;
    FullName: string;
    userURL = '/admin-dashboard';

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private adminService: AdministratorService,
        private studentService: StudentService,
        private dialogService: ConfirmDialogService,
        private authService: AuthenticationService
    ) {
        this.adminInfo = this.authService.credentials();
    }
    ngOnInit() {
        this.currentAdministrator = this.adminService.getAdministrator(this.adminInfo.user_id);
        this.courses = this.adminService.getCoursesByAdministrator(this.adminInfo.user_id);
    }
    create(userType: string, userName: string, fullname: string) {
        if (userType === 'student') {
            this.UserName = userName;
            this.FullName = fullname;
            this.openDialog();
        }
    }
    public openDialog() {
        this.dialogService
            .confirm('Student Creation', 'Are you sure you want to add the Student?')
            .subscribe(res => {
                if (res === true) {
                    const newStudent = new Student(this.UserName, this.FullName, this.course_id, this.review_id);
                    this.studentService.createStudent(newStudent);
                    this.router.navigate([this.userURL]);
                }
            }
        );
    }
    goBack(): void {
        this.router.navigate([this.userURL]);
    }
}

