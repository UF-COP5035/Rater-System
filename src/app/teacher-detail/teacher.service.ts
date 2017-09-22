import { Injectable } from '@angular/core';
<<<<<<< HEAD
import { Teacher } from './teacher';
=======
import {Teacher} from './teacher';
>>>>>>> Added student, teacher, and survey components
import { TEACHERS } from './mock-teachers';


@Injectable()
export class TeacherService {

  getTeachers(): Promise<Teacher[]> {
    return Promise.resolve(TEACHERS);
  }

}
