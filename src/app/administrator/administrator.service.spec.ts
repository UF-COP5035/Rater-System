import { TestBed, async, inject } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';
import { HttpModule, Http, Response, ResponseOptions, XHRBackend } from '@angular/http';

import { AdministratorService } from './administrator.service';
import { Administrator } from './administrator';

export const ADMINISTRATORS: Administrator[] = [
  { _id: 1, username: 'testuser1', course_ids: [1, 2, 3], review_ids: [1, 2, 3], student_ids: [1, 2, 3], teacher_ids: [1, 2, 3] },
  { _id: 2, username: 'testuser2', course_ids: [6, 4, 15], review_ids: [4, 5, 6], student_ids: [1, 2, 3], teacher_ids: [1, 2, 3] },
  { _id: 3, username: 'testuser3', course_ids: [5, 14, 13], review_ids: [7, 8, 9], student_ids: [1, 2, 3], teacher_ids: [1, 2, 3] },
  { _id: 4, username: 'testuser4', course_ids: [12, 8, 7], review_ids: [10, 11, 12], student_ids: [1, 2, 3], teacher_ids: [1, 2, 3] },
  { _id: 5, username: 'testuser5', course_ids: [10, 9, 11], review_ids: [13, 14, 15], student_ids: [1, 2, 3], teacher_ids: [1, 2, 3] },
];

let mock_response_type;

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

  it('should be created', inject([AdministratorService, XHRBackend], (service: AdministratorService, mockBackend) => {

    const mockResponseGetAll = {
      data: ADMINISTRATORS
    };

    const mockResponseGetOne = {
      data: ADMINISTRATORS[0]
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

  describe('getAdministrator()', () => {

    it('should return an Observable<Administrator>',
      inject([AdministratorService, XHRBackend], (administratorService, mockBackend) => {

        mock_response_type = 0;

        administratorService.getAdministrator(ADMINISTRATORS[0]._id).then((administrator) => {
          expect(administrator).toEqual(ADMINISTRATORS[0]);
        });

      }));
  });

  describe('getAdministrators()', () => {

    it('should return an Observable<Array<Administrator>>',
      inject([AdministratorService, XHRBackend], (administratorService, mockBackend) => {

        mock_response_type = 1;

        administratorService.getAdministrators().then((administrators) => {
          expect(administrators.length).toBe(ADMINISTRATORS.length);
          let i = 0;
          ADMINISTRATORS.forEach(mock_administrator => {
            expect(administrators[i]).toEqual(mock_administrator);
            i++;
          });
        });

      }));
  });

});
