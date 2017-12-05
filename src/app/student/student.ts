export class Student {
    _id: string;
    username: string;
    fullname: string;
    password: string;
    course_ids: string[];
    review_ids: string[];

    constructor(username: string, fullname: string, course_ids: string[], review_ids: string[]) {
        this.username = username;
        this.fullname = fullname;
        this.course_ids = course_ids;
        this.review_ids = review_ids;
    }
}
