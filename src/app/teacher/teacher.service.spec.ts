import { TestBed, async, inject } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';
import { HttpModule, Http, Response, ResponseOptions, XHRBackend } from '@angular/http';

import { TeacherService } from './teacher.service';
import { Teacher } from './teacher';

export const TEACHERS: Teacher[] = [
    { _id: 1, username: 'test_teacher1', fullname: 'Test Teacher1' },
    { _id: 2, username: 'test_teacher2', fullname: 'Test Teacher2' },
    { _id: 3, username: 'test_teacher3', fullname: 'Test Teacher3' },
    { _id: 4, username: 'test_teacher4', fullname: 'Test Teacher4' },
    { _id: 5, username: 'test_teacher5', fullname: 'Test Teacher5' },
];

export const STUDENTS = [
    { course_name: 'test_course1', course_code: 'AAA1111', student_name: 'Test Student1' },
    { course_name: 'test_course1', course_code: 'AAA1111', student_name: 'Test Student2' },
    { course_name: 'test_course2', course_code: 'AAA2222', student_name: 'Test Student1' },
];

export const COURSES = [
    { course_name: 'test_course1', course_code: 'AAA1111' },
    { course_name: 'test_course2', course_code: 'AAA2222' },
    { course_name: 'test_course3', course_code: 'AAA3333' },
    { course_name: 'test_course4', course_code: 'AAA4444' },
    { course_name: 'test_course5', course_code: 'AAA5555' },
];

export const REVIEW_CONTENT = [
    { question: 'Favorite Color', answer: 'Blue' },
    { question: 'Favorite Animal', answer: 'Dog' },
    { question: 'Favorite Music', answer: 'Rock n Roll' },
];

export const REVIEWS = [
    { course_name: 'test_course1', course_code: 'AAA1111', review_content: REVIEW_CONTENT },
    { course_name: 'test_course1', course_code: 'AAA1111', review_content: REVIEW_CONTENT },
    { course_name: 'test_course2', course_code: 'AAA2222', review_content: REVIEW_CONTENT },
];

describe('TeacherService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpModule],
            providers: [
                TeacherService,
                { provide: XHRBackend, useClass: MockBackend }
            ]
        });
    });

    it('should be created', inject([TeacherService], (service: TeacherService) => {
        expect(service).toBeTruthy();
    }));

    describe('getTeacher()', () => {
        it('should get teacher data', inject([TeacherService, XHRBackend], (teacherService, mockBackend) => {
            const mockResponse = { data: TEACHERS[0] };
            mockBackend.connections.subscribe(connection => {
                connection.mockRespond(new Response(new ResponseOptions({
                    body: JSON.stringify(mockResponse)
                })));
                expect(connection.request.url).toBe('api/teachers/1');
            });
            teacherService.getTeacher(1).then((res) => {
                expect(res).toEqual(TEACHERS[0]);
            });
        }));

        it('should return error', inject([TeacherService, XHRBackend], (teacherService, mockBackend) => {
            mockBackend.connections.subscribe((connection => {
                connection.mockError(new Error('some error'));
            }));
            teacherService.getTeacher(1).then((res) => {
                expect(res).toBeDefined();
            });
        }));
    });

    describe('getTeachers()', () => {
        it('should get an array of teacher data', inject([TeacherService, XHRBackend], (teacherService, mockBackend) => {
            const mockResponse = { data: TEACHERS };
            mockBackend.connections.subscribe(connection => {
                connection.mockRespond(new Response(new ResponseOptions({
                    body: JSON.stringify(mockResponse)
                })));
                expect(connection.request.url).toBe('api/teachers');
            });
            teacherService.getTeachers().then((res) => {
                expect(res).toEqual(TEACHERS);
            });
        }));

        it('should return error', inject([TeacherService, XHRBackend], (teacherService, mockBackend) => {
            mockBackend.connections.subscribe((connection => {
                connection.mockError(new Error('some error'));
            }));
            teacherService.getTeachers().then((res) => {
                expect(res).toBeDefined();
            });
        }));
    });

    describe('getTeacherByUsername()', () => {
        it('should get teacher data', inject([TeacherService, XHRBackend], (teacherService, mockBackend) => {
            const mockResponse = { data: TEACHERS[0] };
            mockBackend.connections.subscribe(connection => {
                connection.mockRespond(new Response(new ResponseOptions({
                    body: JSON.stringify(mockResponse)
                })));
                expect(connection.request.url).toBe('api/teachers/test_teacher1/user');
            });
            teacherService.getTeacherByUsername('test_teacher1').then((res) => {
                expect(res).toEqual(TEACHERS[0]);
            });
        }));

        it('should return error', inject([TeacherService, XHRBackend], (teacherService, mockBackend) => {
            mockBackend.connections.subscribe((connection => {
                connection.mockError(new Error('some error'));
            }));
            teacherService.getTeacherByUsername().then((res) => {
                expect(res).toBeDefined();
            });
        }));
    });

    describe('getCoursesByTeacher()', () => {
        it('should get an array of course data', inject([TeacherService, XHRBackend], (teacherService, mockBackend) => {
            const mockResponse = { data: COURSES };
            mockBackend.connections.subscribe(connection => {
                connection.mockRespond(new Response(new ResponseOptions({
                    body: JSON.stringify(mockResponse)
                })));
                expect(connection.request.url).toBe('api/teachers/undefined/courses');
            });
            teacherService.getCoursesByTeacher().then((res) => {
                expect(res).toEqual(COURSES);
            });
        }));

        it('should return error', inject([TeacherService, XHRBackend], (teacherService, mockBackend) => {
            mockBackend.connections.subscribe((connection => {
                connection.mockError(new Error('some error'));
            }));
            teacherService.getCoursesByTeacher().then((res) => {
                expect(res).toBeDefined();
            });
        }));
    });

    describe('getReviewsByTeacher()', () => {
        it('should get an array of review data', inject([TeacherService, XHRBackend], (teacherService, mockBackend) => {
            const mockResponse = { data: REVIEWS };
            mockBackend.connections.subscribe(connection => {
                connection.mockRespond(new Response(new ResponseOptions({
                    body: JSON.stringify(mockResponse)
                })));
                expect(connection.request.url).toBe('api/teachers/undefined/reviews');
            });
            teacherService.getReviewsByTeacher().then((res) => {
                expect(res).toEqual(REVIEWS);
            });
        }));

        it('should return error', inject([TeacherService, XHRBackend], (teacherService, mockBackend) => {
            mockBackend.connections.subscribe((connection => {
                connection.mockError(new Error('some error'));
            }));
            teacherService.getReviewsByTeacher().then((res) => {
                expect(res).toBeDefined();
            });
        }));
    });

    describe('getStudentsByTeacher()', () => {
        it('should get an array of student data', inject([TeacherService, XHRBackend], (teacherService, mockBackend) => {
            const mockResponse = { data: STUDENTS };
            mockBackend.connections.subscribe(connection => {
                connection.mockRespond(new Response(new ResponseOptions({
                    body: JSON.stringify(mockResponse)
                })));
                expect(connection.request.url).toBe('api/teachers/undefined/students');
            });
            teacherService.getStudentsByTeacher().then((res) => {
                expect(res).toEqual(STUDENTS);
            });
        }));

        it('should return error', inject([TeacherService, XHRBackend], (teacherService, mockBackend) => {
            mockBackend.connections.subscribe((connection => {
                connection.mockError(new Error('some error'));
            }));
            teacherService.getStudentsByTeacher().then((res) => {
                expect(res).toBeDefined();
            });
        }));
    });

    describe('createTeacher()', () => {
        it('should return error', inject([TeacherService, XHRBackend], (teacherService, mockBackend) => {
            mockBackend.connections.subscribe((connection => {
                connection.mockError(new Error('some error'));
            }));
            teacherService.createTeacher(TEACHERS[0]).then((res) => {
                expect(res).toBeDefined();
            });
        }));
    });

    describe('deleteTeacher()', () => {
        it('should return error', inject([TeacherService, XHRBackend], (teacherService, mockBackend) => {
            mockBackend.connections.subscribe((connection => {
                connection.mockError(new Error('some error'));
            }));
            teacherService.deleteTeacher(1).then((res) => {
                expect(res).toBeDefined();
            });
        }));
    });

    describe('updateTeacher()', () => {
        it('should return error', inject([TeacherService, XHRBackend], (teacherService, mockBackend) => {
            mockBackend.connections.subscribe((connection => {
                connection.mockError(new Error('some error'));
            }));
            teacherService.updateTeacher(TEACHERS[0]).then((res) => {
                expect(res).toBeDefined();
            });
        }));
    });
});
