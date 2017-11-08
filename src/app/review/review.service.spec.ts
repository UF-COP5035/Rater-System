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

const REVIEW_CONTENT: ReviewQuestion[] = [
  { question: 'Favorite Color', answer: 'Blue' },
  { question: 'Favorite Animal', answer: 'Dog' },
  { question: 'Favorite Music', answer: 'Rock n Roll' },
];

export const REVIEWS: Review[] = [
  { _id: 1, student_id: 1, teacher_id: 1, course_id: 1, content: REVIEW_CONTENT },
  { _id: 2, student_id: 3, teacher_id: 2, course_id: 2, content: REVIEW_CONTENT },
  { _id: 3, student_id: 1, teacher_id: 2, course_id: 2, content: REVIEW_CONTENT },
];

let mock_response_type;

describe('ReviewService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        ReviewService,
        { provide: XHRBackend, useClass: MockBackend }
      ]
    });
  });

  it('should be created', inject([ReviewService, XHRBackend], (service: ReviewService, mockBackend) => {

    const mockResponseGetAll = {
      data: REVIEWS
    };

    const mockResponseGetOne = {
      data: REVIEWS[0]
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

  describe('getReview()', () => {

    it('should return an Observable<Review>',
      inject([ReviewService, XHRBackend], (reviewService, mockBackend) => {

        mock_response_type = 0;

        reviewService.getReview(REVIEWS[0]._id).then((review) => {
          expect(review).toEqual(REVIEWS[0]);
        });

      }));
  });

  describe('getReviews()', () => {

    it('should return an Observable<Array<Review>>',
      inject([ReviewService, XHRBackend], (reviewService, mockBackend) => {

        mock_response_type = 1;

        reviewService.getReviews().then((reviews) => {
          expect(reviews.length).toBe(REVIEWS.length);
          let i = 0;
          REVIEWS.forEach(mock_review => {
            expect(reviews[i]).toEqual(mock_review);
            i++;
          });
        });

      }));
  });

});
