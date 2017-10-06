import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Review } from './review';

@Injectable()
export class ReviewService {

  result: any;
  private headers = new Headers({ 'Content-Type': 'application/json' });
  private reviewsUrl = 'api/reviews';  // URL to review api

  constructor(private http: Http) { }

  getReviews(): Promise<Review[]> {
    return this.http.get(this.reviewsUrl)
      .toPromise()
      .then(response => response.json().data as Review[])
      .catch(this.handleError);
  }

  getReview(id: number): Promise<Review> {
    const url = `${this.reviewsUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json().data as Review)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('Unable to retrieve reviews', error);
    return Promise.reject(error.message || error);
  }

}
