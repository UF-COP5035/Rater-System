import { TestBed, async, inject } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';
import { HttpModule, Http, Response, ResponseOptions, XHRBackend } from '@angular/http';

import { TeacherService } from './teacher.service';
import { Teacher } from './teacher';

export const TEACHERS: Teacher[] = [
  { _id: 1, username: 'testuser1', course_ids: [1, 2, 3], review_ids: [1, 2, 3], student_ids: [1, 2, 3] },
  { _id: 2, username: 'testuser2', course_ids: [6, 4, 15], review_ids: [4, 5, 6], student_ids: [1, 2, 3] },
  { _id: 3, username: 'testuser3', course_ids: [5, 14, 13], review_ids: [7, 8, 9], student_ids: [1, 2, 3] },
  { _id: 4, username: 'testuser4', course_ids: [12, 8, 7], review_ids: [10, 11, 12], student_ids: [1, 2, 3] },
  { _id: 5, username: 'testuser5', course_ids: [10, 9, 11], review_ids: [13, 14, 15], student_ids: [1, 2, 3] },
];

let mock_response_type;

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

  it('should be created', inject([TeacherService, XHRBackend], (service: TeacherService, mockBackend) => {

    const mockResponseGetAll = {
      data: TEACHERS
    };

    const mockResponseGetOne = {
      data: TEACHERS[0]
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

  describe('getTeacher()', () => {

    it('should return an Observable<Teacher>',
      inject([TeacherService, XHRBackend], (teacherService, mockBackend) => {

        mock_response_type = 0;

        teacherService.getTeacher(TEACHERS[0]._id).then((teacher) => {
          expect(teacher).toEqual(TEACHERS[0]);
        });

      }));
  });

  describe('getTeachers()', () => {

    it('should return an Observable<Array<Teacher>>',
      inject([TeacherService, XHRBackend], (teacherService, mockBackend) => {

        mock_response_type = 1;

        teacherService.getTeachers().then((teachers) => {
          expect(teachers.length).toBe(TEACHERS.length);
          let i = 0;
          TEACHERS.forEach(mock_teacher => {
            expect(teachers[i]).toEqual(mock_teacher);
            i++;
          });
        });

      }));
  });

});
