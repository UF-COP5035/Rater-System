export class Review {
    _id: string;
    student_id: string;
    teacher_id: string;
    course_id: string;
    review_content: ReviewQuestion<any>[];

    constructor(student_id: string, teacher_id: string, course_id: string, review_content: ReviewQuestion<any>[]) {
        this.student_id = student_id;
        this.teacher_id = teacher_id;
        this.course_id = course_id;
        this.review_content = review_content;
    }
}

export class ReviewQuestion<T> {

    answer: T;
    question: string;
    label: string;
    required: boolean;
    order: number;
    controlType: string;

    constructor(options: {
        answer?: T,
        question?: string,
        label?: string,
        required?: boolean,
        order?: number,
        controlType?: string
    } = {}) {
        this.answer = options.answer;
        this.question = options.question || '';
        this.label = options.label || '';
        this.required = !!options.required;
        this.order = options.order === undefined ? 1 : options.order;
        this.controlType = options.controlType || '';
    }
}

export class TextboxQuestion extends ReviewQuestion<string> {
    controlType = 'textbox';
    type: string;

    constructor(options: {} = {}) {
        super(options);
        this.type = options['type'] || '';
    }
}

export class DropdownQuestion extends ReviewQuestion<string> {
    controlType = 'dropdown';
    options: { key: string, value: string }[] = [];

    constructor(options: {} = {}) {
        super(options);
        this.options = options['options'] || [];
    }
}
