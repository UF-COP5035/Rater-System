import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Teacher } from './teacher';
import { Course } from '../course/course';
import { Review } from '../review/review';
import { Student } from '../student/student';

@Injectable()
export class TeacherService {

    result: any;
    private headers = new Headers({ 'Content-Type': 'application/json' });
    private teachersUrl = 'api/teachers';  // URL to teacher api

    constructor(private http: Http) { }

    // get("/api/teachers")
    getTeachers(): Promise<Teacher[]> {
        return this.http.get(this.teachersUrl)
            .toPromise()
            .then(response => response.json().data as Teacher[])
            .catch(this.handleError);
    }

    // get("/api/teachers/:id")
    getTeacher(id: string): Promise<Teacher> {
        const url = `${this.teachersUrl}/${id}`;
        return this.http.get(url)
            .toPromise()
            .then(response => response.json().data as Teacher)
            .catch(this.handleError);
    }

    // get("/api/teachers/:username/user")
    getTeacherByUsername(username: string): Promise<Teacher> {
        const url = `${this.teachersUrl}/${username}/user`;
        return this.http.get(url)
            .toPromise()
            .then(response => response.json().data as Teacher)
            .catch(this.handleError);
    }

    // get("/api/teachers/:teacher_id/courses")
    getCoursesByTeachers(teacher_id: string): Promise<Course[]> {
        const url = `${this.teachersUrl}/${teacher_id}/courses`;
        return this.http.get(url)
            .toPromise()
            .then(response => response.json().data as Course[])
            .catch(this.handleError);
    }
    // get("/api/teachers/:teacher_id/reviews")
    getReviewsByTeachers(teacher_id: string): Promise<Review[]> {
        const url = `${this.teachersUrl}/${teacher_id}/reviews`;
        return this.http.get(url)
            .toPromise()
            .then(response => response.json().data as Review[])
            .catch(this.handleError);
    }
    // get("/api/teachers/:teacher_id/students")
    getStudentsByTeachers(teacher_id: string): Promise<Student[]> {
        const url = `${this.teachersUrl}/${teacher_id}/students`;
        return this.http.get(url)
            .toPromise()
            .then(response => response.json().data as Student[])
            .catch(this.handleError);
    }

    // post("/api/teachers")
    createTeacher(newTeacher: Teacher): Promise<Teacher> {
        return this.http.post(this.teachersUrl, newTeacher)
            .toPromise()
            .then(response => response.json().data as Teacher)
            .catch(this.handleError);
    }

    // delete("/api/teachers/:id")
    deleteTeacher(delTeacherId: String): Promise<String> {
        return this.http.delete(this.teachersUrl + '/' + delTeacherId)
            .toPromise()
            .then(response => response.json() as String)
            .catch(this.handleError);
    }

    // put("/api/teachers/:id")
    updateTeacher(putTeacher: Teacher): Promise<Teacher> {
        const putUrl = this.teachersUrl + '/' + putTeacher._id;
        return this.http.put(putUrl, putTeacher)
            .toPromise()
            .then(response => response.json() as Teacher)
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('Unable to retrieve teachers', error);
        return Promise.reject(error.message || error);
    }

}
