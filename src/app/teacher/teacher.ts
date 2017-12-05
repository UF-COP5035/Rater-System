export class Teacher {
    _id: string;
    username: string;
    fullname: string;
    password: string;

    constructor(username: string, fullname: string) {
        this.username = username;
        this.fullname = fullname;
    }
}
