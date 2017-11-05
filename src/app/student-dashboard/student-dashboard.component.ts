import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpModule, Http } from '@angular/http';
import {StudentService} from '../student/student.service'

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css']
})
@Injectable()
export class StudentDashboardComponent implements OnInit {
  constructor(private stuser:StudentService) {}
  Percentage(id:string) {
    let numbercompleted=this.stuser.getReviewsByStudent(id).then.length;
    let coursenumber=this.stuser.getCoursesByStudent(id).then.length;
    let percentage:number=100*numbercompleted/coursenumber;
    return percentage+"% courses has been reviewed."
  }


  ngOnInit() {
  }


}
