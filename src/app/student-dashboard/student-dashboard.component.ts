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
  student$ : Observable<Student>;

  

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: StudentService
  ) {}

  ngOnInit() {

    this.student$ = this.route.paramMap
    .switchMap((params: ParamMap) =>
      this.service.getStudent(params.get('_id')));
   }
    
  }

