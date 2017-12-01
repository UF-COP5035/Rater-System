import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { StudentService } from '../student/student.service';
import { Observer } from 'rxjs/Observer';
import { TeacherService } from '../teacher/teacher.service';
import { AdministratorService } from '../administrator/administrator.service';

export interface Credentials {
    // Customize received credentials here
    username: string;
    token: string;
    type: string;
    user_id: string;
}

export interface LoginContext {
    username: string;
    password: string;
}

const credentialsKey = 'credentials';

/**
 * Provides a base for authentication workflow.
 * The Credentials interface as well as login/logout methods should be replaced with proper implementation.
 */
@Injectable()
export class AuthenticationService {

    private _credentials: Credentials | null;
    // private user;

    constructor(
        private studentService: StudentService,
        private teacherService: TeacherService,
        private administratorService: AdministratorService,
    ) {
        const savedCredentials = sessionStorage.getItem(credentialsKey) || localStorage.getItem(credentialsKey);
        if (savedCredentials) {
            this._credentials = JSON.parse(savedCredentials);
        }
    }

    /**
     * Authenticates the user.
     * @param {LoginContext} context The login parameters.
     * @return {Observable<Credentials>} The user credentials.
     */
    login(userType: string, context: LoginContext, remember: boolean): Observable<Credentials> {
        console.log(userType, context);
        return Observable.create((observer: Observer<Credentials>) => {
            if (userType === 'student') {
                this.studentService.getStudentByLoginInfo(context)
                    .then(student => {
                        const data = {
                            type: userType,
                            username: context.username,
                            token: '123456',
                            user_id: student._id
                        };
                        this.setCredentials(data, remember);
                        observer.next(data);
                        observer.complete();
                    })
                    .catch(error => {
                        observer.error(error);
                    });
            } else if (userType === 'teacher') {
                this.teacherService.getTeacherByLoginInfo(context)
                    .then(teacher => {
                        const data = {
                            type: userType,
                            username: context.username,
                            token: '123456',
                            user_id: teacher._id
                        };
                        this.setCredentials(data, remember);
                        observer.next(data);
                        observer.complete();
                    })
                    .catch(error => {
                        observer.error(error);
                    });
            } else if (userType === 'admin') {
                this.administratorService.getAdministratorByLoginInfo(context)
                    .then(administrator => {
                        const data = {
                            type: userType,
                            username: context.username,
                            token: '123456',
                            user_id: administrator._id
                        };
                        this.setCredentials(data, remember);
                        observer.next(data);
                        observer.complete();
                    })
                    .catch(error => {
                        observer.error(error);
                    });
            }
        });
    }

    /**
     * Logs out the user and clear credentials.
     * @return {Observable<boolean>} True if the user was logged out successfully.
     */
    logout(): Observable<boolean> {
        // Customize credentials invalidation here
        this.setCredentials();
        return of(true);
    }

    /**
     * Checks is the user is authenticated.
     * @return {boolean} True if the user is authenticated.
     */
    isAuthenticated(): boolean {
        return !!this.credentials;
    }

    /**
     * Gets the user credentials.
     * @return {Credentials} The user credentials or null if the user is not authenticated.
     */
    credentials(): Credentials | null {
        return this._credentials;
    }

    /**
     * Sets the user credentials.
     * The credentials may be persisted across sessions by setting the `remember` parameter to true.
     * Otherwise, the credentials are only persisted for the current session.
     * @param {Credentials=} credentials The user credentials.
     * @param {boolean=} remember True to remember credentials across sessions.
     */
    private setCredentials(credentials?: Credentials, remember?: boolean) {
        this._credentials = credentials || null;

        if (credentials) {
            const storage = remember ? localStorage : sessionStorage;
            storage.setItem(credentialsKey, JSON.stringify(credentials));
        } else {
            sessionStorage.removeItem(credentialsKey);
            localStorage.removeItem(credentialsKey);
        }

        return credentials;
    }

}
