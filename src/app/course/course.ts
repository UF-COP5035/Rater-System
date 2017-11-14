
export class Course {
    _id: number;
    course_name: string;
    course_code: string;

    constructor(_id: number, course_name: string, course_code: string) {
        this._id = _id;
        this.course_name = course_name;
        this.course_code = course_code;
    }
}
