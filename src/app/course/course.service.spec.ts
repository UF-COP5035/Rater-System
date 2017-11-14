import { TestBed, async, inject } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';
import { HttpModule, Http, Response, ResponseOptions, XHRBackend } from '@angular/http';

import { CourseService } from './course.service';
import { Course } from './course';

export const COURSES: Course[] = [
    { _id: 1, course_code: 'AAA1234', course_name: 'Test Course1' },
    { _id: 2, course_code: 'BBB5678', course_name: 'Test Course2' },
    { _id: 3, course_code: 'CCC0910', course_name: 'Test Course3' },
];

export const STUDENTS = [
    { student_name: 'Test Student1' },
    { student_name: 'Test Student2' },
    { student_name: 'Test Student3' },
    { student_name: 'Test Student4' },
    { student_name: 'Test Student5' },
];

describe('CourseService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpModule],
            providers: [
                CourseService,
                { provide: XHRBackend, useClass: MockBackend }
            ]
        });
    });

    it('should be created', inject([CourseService, XHRBackend], (service: CourseService, mockBackend) => {
        expect(service).toBeTruthy();
    }));

    describe('getCourse()', () => {
        it('should get course data', inject([CourseService, XHRBackend], (courseService, mockBackend) => {
            const mockResponse = { data: COURSES[0] };
            mockBackend.connections.subscribe(connection => {
                connection.mockRespond(new Response(new ResponseOptions({
                    body: JSON.stringify(mockResponse)
                })));
                expect(connection.request.url).toBe('api/courses/1');
            });
            courseService.getCourse(1).then((res) => {
                expect(res).toEqual(COURSES[0]);
            });
        }));

        it('should return error', inject([CourseService, XHRBackend], (courseService, mockBackend) => {
            mockBackend.connections.subscribe((connection => {
                connection.mockError(new Error('some error'));
            }));
            courseService.getCourse(1).then((res) => {
                expect(res).toBeDefined();
            });
        }));
    });

    describe('getCourses()', () => {
        it('should get and array of course data', inject([CourseService, XHRBackend], (courseService, mockBackend) => {
            const mockResponse = { data: COURSES };
            mockBackend.connections.subscribe(connection => {
                connection.mockRespond(new Response(new ResponseOptions({
                    body: JSON.stringify(mockResponse)
                })));
                expect(connection.request.url).toBe('api/courses');
            });
            courseService.getCourses().then((res) => {
                expect(res).toEqual(COURSES);
            });
        }));

        it('should return error', inject([CourseService, XHRBackend], (courseService, mockBackend) => {
            mockBackend.connections.subscribe((connection => {
                connection.mockError(new Error('some error'));
            }));
            courseService.getCourses().then((res) => {
                expect(res).toBeDefined();
            });
        }));
    });

    describe('getStudentsByCourse()', () => {
        it('should get and array of student data', inject([CourseService, XHRBackend], (courseService, mockBackend) => {
            const mockResponse = { data: STUDENTS };
            mockBackend.connections.subscribe(connection => {
                connection.mockRespond(new Response(new ResponseOptions({
                    body: JSON.stringify(mockResponse)
                })));
                expect(connection.request.url).toBe('api/courses/undefined/students');
            });
            courseService.getStudentsByCourse().then((res) => {
                expect(res).toEqual(STUDENTS);
            });
        }));

        it('should return error', inject([CourseService, XHRBackend], (courseService, mockBackend) => {
            mockBackend.connections.subscribe((connection => {
                connection.mockError(new Error('some error'));
            }));
            courseService.getStudentsByCourse().then((res) => {
                expect(res).toBeDefined();
            });
        }));
    });

    describe('createCourse()', () => {
        it('should return error', inject([CourseService, XHRBackend], (courseService, mockBackend) => {
            mockBackend.connections.subscribe((connection => {
                connection.mockError(new Error('some error'));
            }));
            courseService.createCourse(COURSES[0]).then((res) => {
                expect(res).toBeDefined();
            });
        }));
    });

    describe('deleteCourse()', () => {
        it('should return error', inject([CourseService, XHRBackend], (courseService, mockBackend) => {
            mockBackend.connections.subscribe((connection => {
                connection.mockError(new Error('some error'));
            }));
            courseService.deleteCourse(1).then((res) => {
                expect(res).toBeDefined();
            });
        }));
    });

    describe('updateCourse()', () => {
        it('should return error', inject([CourseService, XHRBackend], (courseService, mockBackend) => {
            mockBackend.connections.subscribe((connection => {
                connection.mockError(new Error('some error'));
            }));
            courseService.updateCourse(COURSES[0]).then((res) => {
                expect(res).toBeDefined();
            });
        }));
    });

});
