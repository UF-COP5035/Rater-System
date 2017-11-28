import { TestBed, async, inject } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';
import { HttpModule, Http, Response, ResponseOptions, XHRBackend } from '@angular/http';

import { StudentService } from './student.service';
import { Student } from './student';

export const STUDENTS: Student[] = [
  { _id: 1, username: 'test_student1', fullname: 'Test Student1', course_ids: ['1', '2', '3'], review_ids: ['1'] },
  { _id: 2, username: 'test_student2', fullname: 'Test Student2', course_ids: ['1', '2', '3'], review_ids: ['2'] },
  { _id: 3, username: 'test_student3', fullname: 'Test Student3', course_ids: ['1', '2', '3'], review_ids: ['3'] },
  { _id: 4, username: 'test_student4', fullname: 'Test Student4', course_ids: ['1', '2', '3'], review_ids: ['4'] },
  { _id: 5, username: 'test_student5', fullname: 'Test Student5', course_ids: ['1', '2', '3'], review_ids: ['5'] },
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
  { course_name: 'test_course3', course_code: 'AAA3333', teacher_name: 'test_name3', review_content: REVIEW_CONTENT },
  { course_name: 'test_course4', course_code: 'AAA4444', teacher_name: 'test_name4', review_content: REVIEW_CONTENT },
  { course_name: 'test_course5', course_code: 'AAA5555', teacher_name: 'test_name5', review_content: REVIEW_CONTENT },
];

export const TEACHERS = [
  { teacher_name: 'Test Teacher1' },
  { teacher_name: 'Test Teacher2' },
  { teacher_name: 'Test Teacher3' },
  { teacher_name: 'Test Teacher4' },
  { teacher_name: 'Test Teacher5' },
];

describe('StudentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        StudentService,
        {provide: XHRBackend, useClass: MockBackend}
      ]
    });
  });

  it('should be created', inject([StudentService], (service: StudentService) => {
    expect(service).toBeTruthy();
  }));

  describe('getStudent()', () => {
    it('should get student data', inject([StudentService, XHRBackend], (studentService, mockBackend) => {
      const mockResponse = { data: STUDENTS[0] };
      mockBackend.connections.subscribe(connection => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockResponse)
        })));
        expect(connection.request.url).toBe('api/students/1');
      });
      studentService.getStudent(1).then((res) => {
        expect(res).toEqual(STUDENTS[0]);
      });
    }));

    it('should return error', inject([StudentService, XHRBackend], (studentService, mockBackend) => {
      mockBackend.connections.subscribe((connection => {
        connection.mockError(new Error('some error'));
      }));
      studentService.getStudent(1).then((res) => {
        expect(res).toBeDefined();
      });
    }));
  });

  describe('getStudents()', () => {
    it('should get an array of student data', inject([StudentService, XHRBackend], (studentService, mockBackend) => {
      const mockResponse = { data: STUDENTS };
      mockBackend.connections.subscribe(connection => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockResponse)
        })));
        expect(connection.request.url).toBe('api/students');
      });
      studentService.getStudents().then((res) => {
        expect(res).toEqual(STUDENTS);
      });
    }));

    it('should return error', inject([StudentService, XHRBackend], (studentService, mockBackend) => {
      mockBackend.connections.subscribe((connection => {
        connection.mockError(new Error('some error'));
      }));
      studentService.getStudents().then((res) => {
        expect(res).toBeDefined();
      });
    }));
  });

  describe('getStudentByUsername()', () => {
    it('should get student data', inject([StudentService, XHRBackend], (studentService, mockBackend) => {
      const mockResponse = { data: STUDENTS[0] };
      mockBackend.connections.subscribe(connection => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockResponse)
        })));
        expect(connection.request.url).toBe('api/students/test_teacher1/user');
      });
      studentService.getStudentByUsername('test_teacher1').then((res) => {
        expect(res).toEqual(STUDENTS[0]);
      });
    }));

    it('should return error', inject([StudentService, XHRBackend], (studentService, mockBackend) => {
      mockBackend.connections.subscribe((connection => {
        connection.mockError(new Error('some error'));
      }));
      studentService.getStudentByUsername().then((res) => {
        expect(res).toBeDefined();
      });
    }));
  });

  describe('getCoursesByStudent()', () => {
    it('should get an array of course data', inject([StudentService, XHRBackend], (studentService, mockBackend) => {
      const mockResponse = { data: COURSES };
      mockBackend.connections.subscribe(connection => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockResponse)
        })));
        expect(connection.request.url).toBe('api/students/undefined/courses');
      });
      studentService.getCoursesByStudent().then((res) => {
        expect(res).toEqual(COURSES);
      });
    }));

    it('should return error', inject([StudentService, XHRBackend], (studentService, mockBackend) => {
      mockBackend.connections.subscribe((connection => {
        connection.mockError(new Error('some error'));
      }));
      studentService.getCoursesByStudent().then((res) => {
        expect(res).toBeDefined();
      });
    }));
  });

  describe('getReviewsByStudent()', () => {
    it('should get an array of review data', inject([StudentService, XHRBackend], (studentService, mockBackend) => {
      const mockResponse = { data: REVIEWS };
      mockBackend.connections.subscribe(connection => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockResponse)
        })));
        expect(connection.request.url).toBe('api/students/undefined/reviews');
      });
      studentService.getReviewsByStudent().then((res) => {
        expect(res).toEqual(REVIEWS);
      });
    }));

    it('should return error', inject([StudentService, XHRBackend], (studentService, mockBackend) => {
      mockBackend.connections.subscribe((connection => {
        connection.mockError(new Error('some error'));
      }));
      studentService.getReviewsByStudent().then((res) => {
        expect(res).toBeDefined();
      });
    }));
  });

  describe('getTeachersByStudent()', () => {
    it('should get an array of teacher data', inject([StudentService, XHRBackend], (studentService, mockBackend) => {
      const mockResponse = { data: TEACHERS };
      mockBackend.connections.subscribe(connection => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockResponse)
        })));
        expect(connection.request.url).toBe('api/students/undefined/teachers');
      });
      studentService.getTeachersByStudent().then((res) => {
        expect(res).toEqual(TEACHERS);
      });
    }));

    it('should return error', inject([StudentService, XHRBackend], (studentService, mockBackend) => {
      mockBackend.connections.subscribe((connection => {
        connection.mockError(new Error('some error'));
      }));
      studentService.getTeachersByStudent().then((res) => {
        expect(res).toBeDefined();
      });
    }));
  });

  describe('createStudent()', () => {
    it('should return error', inject([StudentService, XHRBackend], (studentService, mockBackend) => {
      mockBackend.connections.subscribe((connection => {
        connection.mockError(new Error('some error'));
      }));
      studentService.createStudent(STUDENTS[0]).then((res) => {
        expect(res).toBeDefined();
      });
    }));
  });

  describe('deleteStudent()', () => {
    it('should return error', inject([StudentService, XHRBackend], (studentService, mockBackend) => {
      mockBackend.connections.subscribe((connection => {
        connection.mockError(new Error('some error'));
      }));
      studentService.deleteStudent(1).then((res) => {
        expect(res).toBeDefined();
      });
    }));
  });

  describe('updateStudent()', () => {
    it('should return error', inject([StudentService, XHRBackend], (studentService, mockBackend) => {
      mockBackend.connections.subscribe((connection => {
        connection.mockError(new Error('some error'));
      }));
      studentService.updateStudent(STUDENTS[0]).then((res) => {
        expect(res).toBeDefined();
      });
    }));
  });

  describe('CompletedReviews()', () => {
    it('should get an array of review data', inject([StudentService, XHRBackend], (studentService, mockBackend) => {
      const mockResponse = { data: REVIEWS };
      mockBackend.connections.subscribe(connection => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockResponse)
        })));
        expect(connection.request.url).toBe('api/students/undefined/reviews');
      });
      studentService.CompletedReviews().then((res) => {
        expect(res).toEqual(REVIEWS);
      });
    }));

    it('should return error', inject([StudentService, XHRBackend], (studentService, mockBackend) => {
      mockBackend.connections.subscribe((connection => {
        connection.mockError(new Error('some error'));
      }));
      studentService.CompletedReviews().then((res) => {
        expect(res).toBeDefined();
      });
    }));
  });

  describe('getNotCompletedReview()', () => {
    it('should return error', inject([StudentService, XHRBackend], (studentService, mockBackend) => {
      mockBackend.connections.subscribe((connection => {
        connection.mockError(new Error('some error'));
      }));
      expect(studentService.getNotCompletedReview(1)).toBeDefined();

    }));
  });

  describe('getPercentageReview()', () => {
      it('should return error', inject([StudentService, XHRBackend], (studentService, mockBackend) => {
        mockBackend.connections.subscribe((connection => {
          connection.mockError(new Error('some error'));
        }));
        expect(studentService.getPercentageReview(1)).toBeDefined();
      }));
  });

});
