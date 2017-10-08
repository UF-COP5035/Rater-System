
export class Course {
    _id: number;
    courseName: string;
    courseCode: string;

    constructor(_id: number, courseName: string, courseCode: string) {
        this._id = _id;
        this.courseName = courseName;
        this.courseCode = courseCode;
    }
}
