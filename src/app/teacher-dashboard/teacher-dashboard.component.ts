import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule, Routes, Router, ParamMap, Params } from '@angular/router';
import { Teacher } from '../teacher/teacher';
import { TeacherService } from '../teacher/teacher.service';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-teacher-dashboard',
  templateUrl: './teacher-dashboard.component.html',
  styleUrls: ['./teacher-dashboard.component.css']
})
export class TeacherDashboardComponent implements OnInit {
  currentTeacher: Promise<Teacher>;
  courses: Promise<Array<any>>;
  teacherID: string;

  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private service: TeacherService
  ) {
    this.route.params.subscribe(params => this.teacherID = params._id);
   }

  ngOnInit() {
      this.currentTeacher = this.service.getTeacher(this.teacherID);
      this.courses = this.service.getCoursesByTeacher(this.teacherID);
  }
  goToSubmitReviews(userId: string) {
    this.router.navigate(['/teacher-dashboard/review/', userId]);
}



}

