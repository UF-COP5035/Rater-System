import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Administrator } from './administrator';
import { Course } from '../course/course';
import { Review } from '../review/review';
import { Student } from '../student/student';
import { Teacher } from '../teacher/teacher';

@Injectable()
export class AdministratorService {

    result: any;
    private headers = new Headers({ 'Content-Type': 'application/json' });
    private administratorsUrl = 'api/administrators';  // URL to administrator api

    constructor(private http: Http) { }

    // get("/api/administrators")
    getAdministrators(): Promise<Administrator[]> {
        return this.http.get(this.administratorsUrl)
            .toPromise()
            .then(response => response.json().data as Administrator[])
            .catch(this.handleError);
    }

    // get("/api/administrators/:id")
    getAdministrator(id: string): Promise<Administrator> {
        const url = `${this.administratorsUrl}/${id}`;
        return this.http.get(url)
            .toPromise()
            .then(response => response.json().data as Administrator)
            .catch(this.handleError);
    }

    // get("/api/administrators/user/:username")
    getAdministratorByUsername(username: string): Promise<Administrator> {
        const url = `${this.administratorsUrl}/user/${username}`;
        return this.http.get(url)
            .toPromise()
            .then(response => response.json().data as Administrator)
            .catch(this.handleError);
    }

    // get("/api/administrators/:administrator_id/courses")
    getCoursesByAdministrator(administrator_id: string): Promise<Course[]> {
        const url = `${this.administratorsUrl}/${administrator_id}/courses`;
        return this.http.get(url)
            .toPromise()
            .then(response => response.json().data as Course[])
            .catch(this.handleError);
    }

    // get("/api/administrators/:administrator_id/reviews")
    getReviewsByAdministrator(administrator_id: string): Promise<Review[]> {
        const url = `${this.administratorsUrl}/${administrator_id}/reviews`;
        return this.http.get(url)
            .toPromise()
            .then(response => response.json().data as Review[])
            .catch(this.handleError);
    }

    // get("/api/administrators/:administrator_id/students")
    getStudentsByAdministrator(administrator_id: string): Promise<Student[]> {
        const url = `${this.administratorsUrl}/${administrator_id}/students`;
        return this.http.get(url)
            .toPromise()
            .then(response => response.json().data as Student[])
            .catch(this.handleError);
    }

    // get("/api/administrators/:administrator_id/teachers")
    getTeachersByAdministrator(administrator_id: string): Promise<Teacher[]> {
        const url = `${this.administratorsUrl}/${administrator_id}/teachers`;
        return this.http.get(url)
            .toPromise()
            .then(response => response.json().data as Teacher[])
            .catch(this.handleError);
    }

    // post("/api/administrators")
    createAdministrator(newAdmin: Administrator): Promise<Administrator> {
        return this.http.post(this.administratorsUrl, newAdmin)
            .toPromise()
            .then(response => response.json().data as Administrator)
            .catch(this.handleError);
    }

    // delete("/api/administrators/:id")
    deleteAdministrator(delAdministratorId: String): Promise<String> {
        return this.http.delete(this.administratorsUrl + '/' + delAdministratorId)
            .toPromise()
            .then(response => response.json() as String)
            .catch(this.handleError);
    }

    // put("/api/administrators/:id")
    updateAdministrator(putAdministrator: Administrator): Promise<Administrator> {
        const putUrl = this.administratorsUrl + '/' + putAdministrator._id;
        return this.http.put(putUrl, putAdministrator)
            .toPromise()
            .then(response => response.json() as Administrator)
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('Unable to retrieve administrators', error);
        return Promise.reject(error.message || error);
    }

}
