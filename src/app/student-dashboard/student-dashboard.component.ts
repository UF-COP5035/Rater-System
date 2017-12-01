import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule, Routes, Router, ParamMap, Params } from '@angular/router';
import { Student } from '../student/student';
import { StudentService } from '../student/student.service';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';


@Component({
    selector: 'app-student-dashboard',
    templateUrl: './student-dashboard.component.html',
    styleUrls: ['./student-dashboard.component.css']
})
export class StudentDashboardComponent implements OnInit {
    currentStudent: Promise<Student>;
    courses: Promise<Array<any>>;
    studentID: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private service: StudentService
    ) {
      this.route.params.subscribe(params => this.studentID = params._id);
     }

    ngOnInit() {
        this.currentStudent = this.service.getStudent(this.studentID);
        this.courses = this.service.getCoursesByStudent(this.studentID);
    }

    goToSubmitReviews(userId: string) {
        this.router.navigate(['/student-dashboard/review/', userId]);
    }

}

