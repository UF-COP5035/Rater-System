import { TestBed, async, inject } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';
import { HttpModule, Http, Response, ResponseOptions, XHRBackend } from '@angular/http';

import { AdministratorService } from './administrator.service';
import { Administrator } from './administrator';

export const ADMINISTRATORS: Administrator[] = [
    { _id: 1, username: 'test_admin1', fullname: 'Test Admin1', teacher_ids: [1, 2, 3] },
    { _id: 2, username: 'test_admin2', fullname: 'Test Admin2', teacher_ids: [1, 2, 3] },
    { _id: 3, username: 'test_admin3', fullname: 'Test Admin3', teacher_ids: [1, 2, 3] },
    { _id: 4, username: 'test_admin4', fullname: 'Test Admin4', teacher_ids: [1, 2, 3] },
    { _id: 5, username: 'test_admin5', fullname: 'Test Admin5', teacher_ids: [1, 2, 3] },
];

export const COURSES = [
    { course_name: 'test_course1', course_code: 'AAA1111', teacher_name: 'test_name1' },
    { course_name: 'test_course2', course_code: 'AAA2222', teacher_name: 'test_name2' },
    { course_name: 'test_course3', course_code: 'AAA3333', teacher_name: 'test_name3' },
    { course_name: 'test_course4', course_code: 'AAA4444', teacher_name: 'test_name4' },
    { course_name: 'test_course5', course_code: 'AAA5555', teacher_name: 'test_name5' },
];

export const REVIEW_CONTENT = [
    { question: 'Favorite Color', answer: 'Blue' },
    { question: 'Favorite Animal', answer: 'Dog' },
    { question: 'Favorite Music', answer: 'Rock n Roll' },
];

export const REVIEWS = [
    { course_name: 'test_course1', course_code: 'AAA1111', teacher_name: 'test_name1', review_content: REVIEW_CONTENT },
    { course_name: 'test_course2', course_code: 'AAA2222', teacher_name: 'test_name2', review_content: REVIEW_CONTENT },
    { course_name: 'test_course2', course_code: 'AAA2222', teacher_name: 'test_name2', review_content: REVIEW_CONTENT },
];

export const STUDENTS = [
    { course_name: 'test_course1', course_code: 'AAA1111', student_name: 'test_name1' },
    { course_name: 'test_course2', course_code: 'AAA2222', student_name: 'test_name2' },
    { course_name: 'test_course3', course_code: 'AAA3333', student_name: 'test_name3' },
    { course_name: 'test_course4', course_code: 'AAA4444', student_name: 'test_name4' },
    { course_name: 'test_course5', course_code: 'AAA5555', student_name: 'test_name5' },
];

export const TEACHERS = [
    { teacher_name: 'Test Teacher1' },
    { teacher_name: 'Test Teacher2' },
    { teacher_name: 'Test Teacher3' },
    { teacher_name: 'Test Teacher4' },
    { teacher_name: 'Test Teacher5' },
];

describe('AdministratorService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpModule],
            providers: [
                AdministratorService,
                { provide: XHRBackend, useClass: MockBackend }
            ]
        });
    });

    it('should be created', inject([AdministratorService], (service: AdministratorService) => {
        expect(service).toBeTruthy();
    }));

    describe('getAdministrator()', () => {
        it('should get administrator data', inject([AdministratorService, XHRBackend], (administratorService, mockBackend) => {
            const mockResponse = { data: ADMINISTRATORS[0] };
            mockBackend.connections.subscribe(connection => {
                connection.mockRespond(new Response(new ResponseOptions({
                    body: JSON.stringify(mockResponse)
                })));
                expect(connection.request.url).toBe('api/administrators/1');
            });
            administratorService.getAdministrator(1).then((res) => {
                expect(res).toEqual(ADMINISTRATORS[0]);
            });
        }));

        it('should return error', inject([AdministratorService, XHRBackend], (administratorService, mockBackend) => {
            mockBackend.connections.subscribe((connection => {
                connection.mockError(new Error('some error'));
            }));
            administratorService.getAdministrator(1).then((res) => {
                expect(res).toBeDefined();
            });
        }));
    });

    describe('getAdministrators()', () => {
        it('should get and array of administrator data', inject([AdministratorService, XHRBackend], (administratorService, mockBackend) => {
            const mockResponse = { data: ADMINISTRATORS };
            mockBackend.connections.subscribe(connection => {
                connection.mockRespond(new Response(new ResponseOptions({
                    body: JSON.stringify(mockResponse)
                })));
                expect(connection.request.url).toBe('api/administrators');
            });
            administratorService.getAdministrators().then((res) => {
                expect(res).toEqual(ADMINISTRATORS);
            });
        }));

        it('should return error', inject([AdministratorService, XHRBackend], (administratorService, mockBackend) => {
            mockBackend.connections.subscribe((connection => {
                connection.mockError(new Error('some error'));
            }));
            administratorService.getAdministrators().then((res) => {
                expect(res).toBeDefined();
            });
        }));
    });

    describe('getAdministratorByUsername()', () => {
        it('should get administrator data', inject([AdministratorService, XHRBackend], (administratorService, mockBackend) => {
            const mockResponse = { data: ADMINISTRATORS[0] };
            mockBackend.connections.subscribe(connection => {
                connection.mockRespond(new Response(new ResponseOptions({
                    body: JSON.stringify(mockResponse)
                })));
                expect(connection.request.url).toBe('api/administrators/test_teacher1/user');
            });
            administratorService.getAdministratorByUsername('test_teacher1').then((res) => {
                expect(res).toEqual(ADMINISTRATORS[0]);
            });
        }));

        it('should return error', inject([AdministratorService, XHRBackend], (administratorService, mockBackend) => {
            mockBackend.connections.subscribe((connection => {
                connection.mockError(new Error('some error'));
            }));
            administratorService.getAdministratorByUsername().then((res) => {
                expect(res).toBeDefined();
            });
        }));
    });

    describe('getCoursesByAdministrator()', () => {
        it('should get and array of course data', inject([AdministratorService, XHRBackend], (administratorService, mockBackend) => {
            const mockResponse = { data: COURSES };
            mockBackend.connections.subscribe(connection => {
                connection.mockRespond(new Response(new ResponseOptions({
                    body: JSON.stringify(mockResponse)
                })));
                expect(connection.request.url).toBe('api/administrators/undefined/courses');
            });
            administratorService.getCoursesByAdministrator().then((res) => {
                expect(res).toEqual(COURSES);
            });
        }));

        it('should return error', inject([AdministratorService, XHRBackend], (administratorService, mockBackend) => {
            mockBackend.connections.subscribe((connection => {
                connection.mockError(new Error('some error'));
            }));
            administratorService.getCoursesByAdministrator().then((res) => {
                expect(res).toBeDefined();
            });
        }));
    });

    describe('getReviewsByAdministrator()', () => {
        it('should get and array of review data', inject([AdministratorService, XHRBackend], (administratorService, mockBackend) => {
            const mockResponse = { data: REVIEWS };
            mockBackend.connections.subscribe(connection => {
                connection.mockRespond(new Response(new ResponseOptions({
                    body: JSON.stringify(mockResponse)
                })));
                expect(connection.request.url).toBe('api/administrators/undefined/reviews');
            });
            administratorService.getReviewsByAdministrator().then((res) => {
                expect(res).toEqual(REVIEWS);
            });
        }));

        it('should return error', inject([AdministratorService, XHRBackend], (administratorService, mockBackend) => {
            mockBackend.connections.subscribe((connection => {
                connection.mockError(new Error('some error'));
            }));
            administratorService.getReviewsByAdministrator().then((res) => {
                expect(res).toBeDefined();
            });
        }));
    });

    describe('getStudentsByAdministrator()', () => {
        it('should get and array of student data', inject([AdministratorService, XHRBackend], (administratorService, mockBackend) => {
            const mockResponse = { data: STUDENTS };
            mockBackend.connections.subscribe(connection => {
                connection.mockRespond(new Response(new ResponseOptions({
                    body: JSON.stringify(mockResponse)
                })));
                expect(connection.request.url).toBe('api/administrators/undefined/students');
            });
            administratorService.getStudentsByAdministrator().then((res) => {
                expect(res).toEqual(STUDENTS);
            });
        }));

        it('should return error', inject([AdministratorService, XHRBackend], (administratorService, mockBackend) => {
            mockBackend.connections.subscribe((connection => {
                connection.mockError(new Error('some error'));
            }));
            administratorService.getStudentsByAdministrator().then((res) => {
                expect(res).toBeDefined();
            });
        }));
    });

    describe('getTeachersByAdministrator()', () => {
        it('should get and array of teacher data', inject([AdministratorService, XHRBackend], (administratorService, mockBackend) => {
            const mockResponse = { data: TEACHERS };
            mockBackend.connections.subscribe(connection => {
                connection.mockRespond(new Response(new ResponseOptions({
                    body: JSON.stringify(mockResponse)
                })));
                expect(connection.request.url).toBe('api/administrators/undefined/teachers');
            });
            administratorService.getTeachersByAdministrator().then((res) => {
                expect(res).toEqual(TEACHERS);
            });
        }));

        it('should return error', inject([AdministratorService, XHRBackend], (administratorService, mockBackend) => {
            mockBackend.connections.subscribe((connection => {
                connection.mockError(new Error('some error'));
            }));
            administratorService.getTeachersByAdministrator().then((res) => {
                expect(res).toBeDefined();
            });
        }));
    });

    describe('createAdministrator()', () => {
        it('should return error', inject([AdministratorService, XHRBackend], (administratorService, mockBackend) => {
            mockBackend.connections.subscribe((connection => {
                connection.mockError(new Error('some error'));
            }));
            administratorService.createAdministrator(ADMINISTRATORS[0]).then((res) => {
                expect(res).toBeDefined();
            });
        }));
    });

    describe('deleteAdministrator()', () => {
        it('should return error', inject([AdministratorService, XHRBackend], (administratorService, mockBackend) => {
            mockBackend.connections.subscribe((connection => {
                connection.mockError(new Error('some error'));
            }));
            administratorService.deleteAdministrator(1).then((res) => {
                expect(res).toBeDefined();
            });
        }));
    });

    describe('updateAdministrator()', () => {
        it('should return error', inject([AdministratorService, XHRBackend], (administratorService, mockBackend) => {
            mockBackend.connections.subscribe((connection => {
                connection.mockError(new Error('some error'));
            }));
            administratorService.updateAdministrator(ADMINISTRATORS[0]).then((res) => {
                expect(res).toBeDefined();
            });
        }));
    });
});
