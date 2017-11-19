import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Review, ReviewQuestion, DropdownQuestion, TextboxQuestion } from './review';

@Injectable()
export class ReviewService {

    result: any;
    private headers = new Headers({ 'Content-Type': 'application/json' });
    private reviewsUrl = 'api/reviews';  // URL to review api
    constructor(private http: Http) { }

    // get("/api/reviews")
    getReviews(): Promise<Review[]> {
        return this.http.get(this.reviewsUrl)
            .toPromise()
            .then(response => response.json().data as Review[])
            .catch(this.handleError);
    }

    // get("/api/reviews/:id")
    getReview(id: string): Promise<Review> {
        const url = `${this.reviewsUrl}/${id}`;
        return this.http.get(url)
            .toPromise()
            .then(response => response.json().data as Review)
            .catch(this.handleError);
    }

    // post("/api/reviews")
    createReview(newReview: Review): Promise<Review> {
        return this.http.post(this.reviewsUrl, newReview)
            .toPromise()
            .then(response => response.json().data as Review)
            .catch(this.handleError);
    }

    // delete("/api/reviews/:id")
    deleteReview(delReviewId: String): Promise<String> {
        return this.http.delete(this.reviewsUrl + '/' + delReviewId)
            .toPromise()
            .then(response => response.json() as String)
            .catch(this.handleError);
    }

    // put("/api/reviews/:id")
    updateReview(putReview: Review): Promise<Review> {
        const putUrl = this.reviewsUrl + '/' + putReview._id;
        return this.http.put(putUrl, putReview)
            .toPromise()
            .then(response => response.json() as Review)
            .catch(this.handleError);
    }

    getQuestions() {
        const questions: ReviewQuestion<any>[] = [

            new TextboxQuestion({
                label: 'Are they a good teacher',
                question: 'goodTeacher',
                required: true,
                order: 1
            }),

            new TextboxQuestion({
                label: 'Any comments',
                question: 'comments',
                required: true,
                order: 2
            })
        ];

        return questions.sort((a, b) => a.order - b.order);
    }

    private handleError(error: any): Promise<any> {
        console.error('Unsuccessful call to reviews API', error);
        return Promise.reject(error);
    }

} /* istanbul ignore next */
