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
