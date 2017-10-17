import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Course } from './course';

@Injectable()
export class CourseService {

<<<<<<< HEAD
    result: any;
    private headers = new Headers({ 'Content-Type': 'application/json' });
    private coursesUrl = 'api/courses';  // URL to course api

    constructor(private http: Http) { }

    // get("/api/courses")
    getCourses(): Promise<Course[]> {
        return this.http.get(this.coursesUrl)
            .toPromise()
            .then(response => response.json().data as Course[])
            .catch(this.handleError);
    }

    // get("/api/courses/:id")
    getCourse(id: string): Promise<Course> {
        const url = `${this.coursesUrl}/${id}`;
        return this.http.get(url)
            .toPromise()
            .then(response => response.json().data as Course)
            .catch(this.handleError);
    }

    // get("/api/courses/:course_id/students")
    getStudentsByCourse(course_id: string) {
        const url = `${this.coursesUrl}/${course_id}/students`;
        return this.http.get(url)
            .toPromise()
            .then(response => response.json().data)
            .catch(this.handleError);
    }

    // post("/api/courses")
    createCourse(newCourse: Course): Promise<Course> {
        return this.http.post(this.coursesUrl, newCourse)
            .toPromise()
            .then(response => response.json().data as Course)
            .catch(this.handleError);
    }

    // delete("/api/courses/:id")
    deleteCourse(delCourseId: String): Promise<String> {
        return this.http.delete(this.coursesUrl + '/' + delCourseId)
            .toPromise()
            .then(response => response.json() as String)
            .catch(this.handleError);
    }

    // put("/api/courses/:id")
    updateCourse(putCourse: Course): Promise<Course> {
        const putUrl = this.coursesUrl + '/' + putCourse._id;
        return this.http.put(putUrl, putCourse)
            .toPromise()
            .then(response => response.json() as Course)
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('Unable to retrieve courses', error);
        return Promise.reject(error);
    }

} /* istanbul ignore next */
=======
  result: any;
  private headers = new Headers({ 'Content-Type': 'application/json' });
  private coursesUrl = 'api/courses';  // URL to course api

  constructor(private http: Http) { }

  // get("/api/courses")
  getCourses(): Promise<Course[]> {
    return this.http.get(this.coursesUrl)
      .toPromise()
      .then(response => response.json().data as Course[])
      .catch(this.handleError);
  }

  // get("/api/courses/:id")
  getCourse(id: string): Promise<Course> {
    const url = `${this.coursesUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json().data as Course)
      .catch(this.handleError);
  }

  // post("/api/courses")
  createCourse(newCourse: Course): Promise<Course> {
    return this.http.post(this.coursesUrl, newCourse)
      .toPromise()
      .then(response => response.json().data as Course)
      .catch(this.handleError);
  }

  // delete("/api/courses/:id")
  deleteCourse(delCourseId: String): Promise<String> {
    return this.http.delete(this.coursesUrl + '/' + delCourseId)
      .toPromise()
      .then(response => response.json() as String)
      .catch(this.handleError);
  }

  // put("/api/courses/:id")
  updateCourse(putCourse: Course): Promise<Course> {
    const putUrl = this.coursesUrl + '/' + putCourse._id;
    return this.http.put(putUrl, putCourse)
      .toPromise()
      .then(response => response.json() as Course)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('Unable to retrieve courses', error);
    return Promise.reject(error.message || error);
  }

}
>>>>>>> Add crud routes and services (#81)
