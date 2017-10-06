
export class Review {
    _id: number;
    student_id: number;
    teacher_id: number;
    course_id: number;
    content: ReviewQuestion[];

    constructor(_id: number, student_id: number, teacher_id: number, course_id: number, content: ReviewQuestion[]) {
        this._id = _id;
        this.student_id = student_id;
        this.teacher_id = teacher_id;
        this.course_id = course_id;
        this.content = content;
    }
}

export class ReviewQuestion {
    question: string;
    answer: string;

    constructor(question: string, answer: string) {
        this.question = question;
        this.answer = answer;
    }
}
