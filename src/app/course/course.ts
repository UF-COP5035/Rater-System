export class Course {
    _id: string;
    course_name: string;
    course_code: string;
    teacher_id: string;

    constructor(course_name: string, course_code: string) {
        this.course_name = course_name;
        this.course_code = course_code;
    }
}
