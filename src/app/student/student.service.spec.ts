import { TestBed, async, inject } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';
import { HttpModule, Http, Response, ResponseOptions, XHRBackend } from '@angular/http';

import { StudentService } from './student.service';
import { Student } from './student';

export const STUDENTS: Student[] = [
  { _id: 1, username: 'testuser1', course_ids: [1, 2, 3], review_ids: [1, 2, 3] },
  { _id: 2, username: 'testuser2', course_ids: [6, 4, 15], review_ids: [4, 5, 6] },
  { _id: 3, username: 'testuser3', course_ids: [5, 14, 13], review_ids: [7, 8, 9] },
  { _id: 4, username: 'testuser4', course_ids: [12, 8, 7], review_ids: [10, 11, 12] },
  { _id: 5, username: 'testuser5', course_ids: [10, 9, 11], review_ids: [13, 14, 15] },
];

let mock_response_type;

describe('StudentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        StudentService,
        { provide: XHRBackend, useClass: MockBackend }
      ]
    });
  });

  it('should be created', inject([StudentService, XHRBackend], (service: StudentService, mockBackend) => {

    const mockResponseGetAll = {
      data: STUDENTS
    };

    const mockResponseGetOne = {
      data: STUDENTS[0]
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

  describe('getStudent()', () => {

    it('should return an Observable<Student>',
      inject([StudentService, XHRBackend], (studentService, mockBackend) => {

        mock_response_type = 0;

        studentService.getStudent(STUDENTS[0]._id).then((student) => {
          expect(student).toEqual(STUDENTS[0]);
        });

      }));
  });

  describe('getStudents()', () => {

    it('should return an Observable<Array<Student>>',
      inject([StudentService, XHRBackend], (studentService, mockBackend) => {

        mock_response_type = 1;

        studentService.getStudents().then((students) => {
          expect(students.length).toBe(STUDENTS.length);
          let i = 0;
          STUDENTS.forEach(mock_student => {
            expect(students[i]).toEqual(mock_student);
            i++;
          });
        });

      }));
  });

});
