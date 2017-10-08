import { TestBed, async, inject } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';
import { HttpModule, Http, Response, ResponseOptions, XHRBackend } from '@angular/http';

import { StudentService } from './student.service';
import { Student } from './student';

export const STUDENTS: Student[] = [
  { _id: 1, username: 'test_student1', fullname: 'Test Student1' },
  { _id: 2, username: 'test_student2', fullname: 'Test Student2' },
  { _id: 3, username: 'test_student3', fullname: 'Test Student3' },
  { _id: 4, username: 'test_student4', fullname: 'Test Student4' },
  { _id: 5, username: 'test_student5', fullname: 'Test Student5' },
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
