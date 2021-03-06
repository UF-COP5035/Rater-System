import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Student } from './student';
import { Review } from '../review/review';
import { Course } from '../course/course';
import { LoginContext } from '../authentication/authentication.service';

@Injectable()
export class StudentService {

    result: any;
    private headers = new Headers({ 'Content-Type': 'application/json' });
    private studentsUrl = 'api/students';  // URL to students api
    courses: Course[] = [];
    notReviewed: Course[] = [];
    reviews: Review[] = [];
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

    // get("/api/students/:student_id/courses")
    getCoursesByStudent(student_id: string) {
        const url = `${this.studentsUrl}/${student_id}/courses`;
        return this.http.get(url)
            .toPromise()
            .then(response => response.json().data)
            .catch(this.handleError);
    }

    // get("/api/students/:student_id/reviews")
    getReviewsByStudent(student_id: string) {
        const url = `${this.studentsUrl}/${student_id}/reviews`;
        return this.http.get(url)
            .toPromise()
            .then(response => response.json().data)
            .catch(this.handleError);
    }

    // get("/api/students/:student_id/teachers")
    getTeachersByStudent(student_id: string) {
        const url = `${this.studentsUrl}/${student_id}/teachers`;
        return this.http.get(url)
            .toPromise()
            .then(response => response.json().data)
            .catch(this.handleError);
    }

    // get("/api/students/:username/:password/user")
    getStudentByLoginInfo(loginContext: LoginContext): Promise<Student> {
        const url = `${this.studentsUrl}/${loginContext.username}/${loginContext.password}/user`;
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

    CompletedReviews(student_id: string) {
        const url = `${this.studentsUrl}/${student_id}/reviews`;
        this.getReviewsByStudent(student_id)
            .then(res => this.reviews = res);
        return this.http.get(url)
            .toPromise()
            .then(response => response.json().data)
            .catch(this.handleError);
    }

    // getNotCompletedReviews
    getNotCompletedReview(id: string): Course[] {
        this.getCoursesByStudent(id)
            .then(course => this.courses = course);
        this.getReviewsByStudent(id)
            .then(res => this.reviews = res);
        let flago = false;
        for (let i = 0; i < this.courses.length; i++) {
            for (let j = 0; j < this.reviews.length; j++) {
                if (this.reviews[j].course_id === this.courses[i]._id) {
                    flago = true;
                }
            }
            if (flago === false) {
                this.notReviewed.push(this.courses[i]);
            }
        }
        return this.notReviewed;
    }

    // getPercentageofReviews
    getPercentageReview(id: string): number {
        this.getCoursesByStudent(id)
            .then(course => this.courses = course);
        this.getReviewsByStudent(id)
            .then(res => this.reviews = res);
        const percent = this.reviews.length / this.courses.length;
        return percent;
    }
    private handleError(error: any): Promise<any> {
        console.error('Unsuccessful call to students API', error);
        return Promise.reject(error);
    }

} /* istanbul ignore next */
