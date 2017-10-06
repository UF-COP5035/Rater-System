import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Teacher } from './teacher';

@Injectable()
export class TeacherService {

  result: any;
  private headers = new Headers({ 'Content-Type': 'application/json' });
  private teachersUrl = 'api/teachers';  // URL to teacher api

  constructor(private http: Http) { }

  getTeachers(): Promise<Teacher[]> {
    return this.http.get(this.teachersUrl)
      .toPromise()
      .then(response => response.json().data as Teacher[])
      .catch(this.handleError);
  }

  getTeacher(id: number): Promise<Teacher> {
    const url = `${this.teachersUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json().data as Teacher)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('Unable to retrieve teachers', error);
    return Promise.reject(error.message || error);
  }

}
