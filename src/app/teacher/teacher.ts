export class Teacher {
    _id: string;
    username: string;
    fullname: string;

    constructor(username: string, fullname: string) {
        this.username = username;
        this.fullname = fullname;
    }
}
