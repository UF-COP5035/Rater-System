
export class Student {
    _id: number;
    username: string;
    fullname: string;
    course_ids: string[];
    review_id: string[];

    constructor(_id: number, username: string, fullname: string, course_ids: string[], review_id: string[]) {
        this._id = _id;
        this.username = username;
        this.fullname = fullname;
        this.course_ids = course_ids;
        this.review_id = review_id;
    }
}
