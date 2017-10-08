
export class Student {
    _id: number;
    username: string;
    fullname: string;

    constructor(_id: number, username: string, fullname: string) {
        this._id = _id;
        this.username = username;
        this.fullname = fullname;
    }
}
