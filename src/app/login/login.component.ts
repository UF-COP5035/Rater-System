import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material';

import { AdministratorService } from '../administrator/administrator.service';
import { TeacherService } from '../teacher/teacher.service';
import { StudentService } from '../student/student.service';
import { Administrator } from '../administrator/administrator';
import { Teacher } from '../teacher/teacher';
import { Student } from '../student/student';
import { AuthenticationService } from '../authentication/authentication.service';
import { AuthenticationGuard } from '../authentication/authentication.guard';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    hide = true;

    constructor(private teacherService: TeacherService,
        private administratorService: AdministratorService,
        private studentService: StudentService,
        private router: Router,
        private authenticationService: AuthenticationService
    ) { }

    ngOnInit() { }

    login(userType: string, userName: string, password: string) {
        this.authenticationService.login(userType, { username: userName, password: password }, false)
            .subscribe(credentials => {
                console.log(`${credentials.username} successfully logged in`);
                this.router.navigate(['/' + userType + '-dashboard/'], { replaceUrl: true });
            });
    }
}
