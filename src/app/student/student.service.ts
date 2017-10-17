import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Student } from './student';

@Injectable()
export class StudentService {

  result: any;
  private headers = new Headers({ 'Content-Type': 'application/json' });
  private studentsUrl = 'api/students';  // URL to students api

  constructor(private http: Http) { }

  // get("/api/students")
  getStudents(): Promise<Student[]> {
    return this.http.get(this.studentsUrl)
      .toPromise()
      .then(response => response.json().data as Student[])
      .catch(this.handleError);
  }

  // get("/api/students/:id")
  getStudent(id: string): Promise<Student> {
    const url = `${this.studentsUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json().data as Student)
      .catch(this.handleError);
  }

  // get("/api/students/user/:username")
  getStudentByUsername(username: string): Promise<Student> {
    const url = `${this.studentsUrl}/user/${username}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json().data as Student)
      .catch(this.handleError);
  }

  // post("/api/students")
  createStudent(newStudent: Student): Promise<Student> {
    return this.http.post(this.studentsUrl, newStudent)
      .toPromise()
      .then(response => response.json().data as Student)
      .catch(this.handleError);
  }

  // delete("/api/students/:id")
  deleteStudent(delStudentId: String): Promise<String> {
    return this.http.delete(this.studentsUrl + '/' + delStudentId)
      .toPromise()
      .then(response => response.json() as String)
      .catch(this.handleError);
  }

  // put("/api/students/:id")
  updateStudent(putStudent: Student): Promise<Student> {
    const putUrl = this.studentsUrl + '/' + putStudent._id;
    return this.http.put(putUrl, putStudent)
      .toPromise()
      .then(response => response.json() as Student)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('Unable to retrieve students', error);
    return Promise.reject(error.message || error);
  }

}
