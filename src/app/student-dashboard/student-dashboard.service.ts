import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Review } from '../review/review';
import {Student} from '../student/student';
import {StudentService} from '../student/student.service';
import {Course} from '../course/course';

@Injectable()
export class StucentDashboardService {

  result: any;
  private headers = new Headers({ 'Content-Type': 'application/json' });
  private studentsUrl = 'api/students';  // URL to review api
  private studentService:StudentService;
  constructor(private http: Http) { }
  courses : Course[] = [];
  Notreviewed: Course[]=[];
  Reviews:Review[]=[];
  //getCompletedReviews
  CompletedReviews(student_id: string) {
    const url = `${this.studentsUrl}/${student_id}/reviews`;
    this.studentService.getReviewsByStudent(student_id)
      .then(Res=>this.Reviews=Res);
    return this.http.get(url)
      .toPromise()
      .then(response => response.json().data)
      .catch(this.handleError);
  }

  // getNotCompletedReviews
  getNotCompletedReview(id: string): Course[] {
    this.studentService.getCoursesByStudent(id)
      .then(course=>this.courses=course);
    this.studentService.getReviewsByStudent(id)
      .then(Res=>this.Reviews=Res);
    let flago : boolean=false;
    for(let i:number=0;i<this.courses.length;i++){
      for(let j:number=0;j<this.Reviews.length;j++){
        if(this.Reviews[j].course_id==this.courses[i]._id) flago=true;
      }
      if(flago==false) this.Notreviewed.push(this.courses[i]);
    }
    return this.Notreviewed;
  }

  // getPercentageofReviews
  getPercentageReview(id: string): number {
    this.studentService.getCoursesByStudent(id)
      .then(course=>this.courses=course);
    this.studentService.getReviewsByStudent(id)
      .then(Res=>this.Reviews=Res);
    let percent:number=this.Reviews.length/this.courses.length;
    return percent;

  }

  private handleError(error: any): Promise<any> {
    console.error('Unable to retrieve reviews', error);
    return Promise.reject(error);
  }

} /* istanbul ignore next */
