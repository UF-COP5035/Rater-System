import { TestBed, async, inject } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';
import { HttpModule, Http, Response, ResponseOptions, XHRBackend } from '@angular/http';
import {
    MatCardModule, MatMenuModule,
    MatToolbarModule, MatIconModule,
    MatInputModule, MatButtonModule,
    MatFormFieldModule, MatSelectModule,
    MatTabsModule
} from '@angular/material';

import { ReviewService } from './review.service';
import { Review, ReviewQuestion } from './review';

const REVIEW_CONTENT: ReviewQuestion<any>[] = [
    { question: 'favColor', answer: 'Blue', label: 'Favorite Color', required: true, order: 1, controlType: null },
    { question: 'favAnimal', answer: 'Dog', label: 'Favorite Animal', required: true, order: 1, controlType: null },
    { question: 'favMusic', answer: 'Rock n Roll', label: 'Favorite Music', required: true, order: 1, controlType: null },
];

export const REVIEWS: Review[] = [
    { _id: '1', student_id: '1', teacher_id: '1', course_id: '1', review_content: REVIEW_CONTENT },
    { _id: '2', student_id: '3', teacher_id: '2', course_id: '2', review_content: REVIEW_CONTENT },
    { _id: '3', student_id: '1', teacher_id: '2', course_id: '2', review_content: REVIEW_CONTENT },
];

describe('ReviewService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpModule],
            providers: [
                ReviewService,
                { provide: XHRBackend, useClass: MockBackend }
            ],
        });
    });

    it('should be created', inject([ReviewService, XHRBackend], (service: ReviewService, mockBackend) => {
        expect(service).toBeTruthy();
    }));

    describe('getReview()', () => {
        it('should get review data', inject([ReviewService, XHRBackend], (reviewService, mockBackend) => {
            const mockResponse = { data: REVIEWS[0] };
            mockBackend.connections.subscribe(connection => {
                connection.mockRespond(new Response(new ResponseOptions({
                    body: JSON.stringify(mockResponse)
                })));
                expect(connection.request.url).toBe('api/reviews/1');
            });
            reviewService.getReview(1).then((res) => {
                expect(res).toEqual(REVIEWS[0]);
            });
        }));

        it('should return error', inject([ReviewService, XHRBackend], (reviewService, mockBackend) => {
            mockBackend.connections.subscribe((connection => {
                connection.mockError(new Error('some error'));
            }));
            reviewService.getReview(1).then((res) => {
                expect(res).toBeDefined();
            });
        }));
    });

    describe('getReviews()', () => {
        it('should get an array of review data', inject([ReviewService, XHRBackend], (reviewService, mockBackend) => {
            const mockResponse = { data: REVIEWS };
            mockBackend.connections.subscribe(connection => {
                connection.mockRespond(new Response(new ResponseOptions({
                    body: JSON.stringify(mockResponse)
                })));
                expect(connection.request.url).toBe('api/reviews');
            });
            reviewService.getReviews().then((res) => {
                expect(res).toEqual(REVIEWS);
            });
        }));

        it('should return error', inject([ReviewService, XHRBackend], (reviewService, mockBackend) => {
            mockBackend.connections.subscribe((connection => {
                connection.mockError(new Error('some error'));
            }));
            reviewService.getReviews().then((res) => {
                expect(res).toBeDefined();
            });
        }));
    });

    describe('createReview()', () => {
        it('should return error', inject([ReviewService, XHRBackend], (reviewService, mockBackend) => {
            mockBackend.connections.subscribe((connection => {
                connection.mockError(new Error('some error'));
            }));
            reviewService.createReview(REVIEWS[0]).then((res) => {
                expect(res).toBeDefined();
            });
        }));
    });

    describe('deleteReview()', () => {
        it('should return error', inject([ReviewService, XHRBackend], (reviewService, mockBackend) => {
            mockBackend.connections.subscribe((connection => {
                connection.mockError(new Error('some error'));
            }));
            reviewService.deleteReview(1).then((res) => {
                expect(res).toBeDefined();
            });
        }));
    });

    describe('updateReview()', () => {
        it('should return error', inject([ReviewService, XHRBackend], (reviewService, mockBackend) => {
            mockBackend.connections.subscribe((connection => {
                connection.mockError(new Error('some error'));
            }));
            reviewService.updateReview(REVIEWS[0]).then((res) => {
                expect(res).toBeDefined();
            });
        }));
    });

});
