
export class Student {
    _id: number;
    username: string;
    fullname: string;
<<<<<<< HEAD

    constructor(_id: number, username: string, fullname: string) {
        this._id = _id;
        this.username = username;
        this.fullname = fullname;
=======
    course_ids: string[];
    review_ids: string[];

    constructor(_id: number, username: string, fullname: string, course_ids: string[], review_ids: string[]) {
        this._id = _id;
        this.username = username;
        this.fullname = fullname;
        this.course_ids = course_ids;
        this.review_ids = review_ids;
>>>>>>> d71f38f0842ba4bbe1a63c369b8cb50d602c7c7b
    }
}
