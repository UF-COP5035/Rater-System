import { TestBed, async, inject } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';
import { HttpModule, Http, Response, ResponseOptions, XHRBackend } from '@angular/http';

import { CourseService } from './course.service';
import { Course } from './course';

export const COURSES: Course[] = [
  { _id: 1, courseName: "AAA1234", student_ids: [1, 2, 3], teacher_id: 1 },
  { _id: 2, courseName: "BBB5678", student_ids: [1, 2, 3], teacher_id: 2 },
  { _id: 3, courseName: "CCC0910", student_ids: [1, 2, 3], teacher_id: 3 },
];

let mock_response_type;

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

    const mockResponseGetAll = {
      data: COURSES
    };

    const mockResponseGetOne = {
      data: COURSES[0]
    };

    mockBackend.connections.subscribe((connection) => {

      if (mock_response_type === 1) {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockResponseGetAll)
        })));
      } else {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockResponseGetOne)
        })));
      }

    });

    expect(service).toBeTruthy();
  }));

  describe('getCourse()', () => {

    it('should return an Observable<Course>',
      inject([CourseService, XHRBackend], (courseService, mockBackend) => {

        mock_response_type = 0;

        courseService.getCourse(COURSES[0]._id).then((course) => {
          expect(course).toEqual(COURSES[0]);
        });

      }));
  });

  describe('getCourses()', () => {

    it('should return an Observable<Array<Course>>',
      inject([CourseService, XHRBackend], (courseService, mockBackend) => {

        mock_response_type = 1;

        courseService.getCourses().then((courses) => {
          expect(courses.length).toBe(COURSES.length);
          let i = 0;
          COURSES.forEach(mock_course => {
            expect(courses[i]).toEqual(mock_course);
            i++;
          });
        });

      }));
  });

});
