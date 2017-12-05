export class Administrator {
    _id: string;
    username: string;
    fullname: string;
    password: string;
    teacher_ids: string[];

    constructor(fullname: string, username: string, teacher_ids: string[]) {
        this.fullname = fullname;
        this.username = username;
        this.teacher_ids = teacher_ids;
    }
}
