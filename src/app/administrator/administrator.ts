
export class Administrator {
    _id: number;
    username: string;
    fullname: string;
    teacher_ids: number[];

    constructor(_id: number, fullname: string, username: string, teacher_ids: number[]) {
        this._id = _id;
        this.fullname = fullname;
        this.username = username;
        this.teacher_ids = teacher_ids;
    }
}
