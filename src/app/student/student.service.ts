import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Student } from './student';

@Injectable()
export class StudentService {

  result: any;
  private headers = new Headers({ 'Content-Type': 'application/json' });
  private studentsUrl = 'api/students';  // URL to student api

  constructor(private http: Http) { }

  getStudents(): Promise<Student[]> {
    return this.http.get(this.studentsUrl)
      .toPromise()
      .then(response => response.json().data as Student[])
      .catch(this.handleError);
  }

  getStudent(id: number): Promise<Student> {
    const url = `${this.studentsUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json().data as Student)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('Unable to retrieve students', error);
    return Promise.reject(error.message || error);
  }

}
