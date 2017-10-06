
export class Course {
    _id: number;
    courseName: string;
    student_ids: number[];
    teacher_id: number;

    constructor(_id: number, courseName: string, student_ids: number[], teacher_id: number) {
        this._id = _id;
        this.courseName = courseName;
        this.student_ids = student_ids;
        this.teacher_id = teacher_id;
    }
}
