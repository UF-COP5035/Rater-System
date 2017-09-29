import { Component, Input, OnInit, } from '@angular/core';
import { Title } from '@angular/platform-browser';

// Import the DataService
import { DataService } from './data.service';
import { Student } from './student';
import { Teacher } from './teacher-detail/teacher';
import { TeacherService } from './teacher-detail/teacher.service';


// Would like to continue to make this into the routing component

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [TeacherService]
})
export class AppComponent implements OnInit {
  teachers: Teacher[];
  selectedTeacher: Teacher;


  constructor(title: Title, private teacherService: TeacherService) {
    title.setTitle('Gator Grader');
  } // Getting Teachers

  getTeachers(): void { //
    this.teacherService.getTeachers().then(teachers => this.teachers = teachers);
  }

  ngOnInit(): void {
    this.getTeachers();
  }

  onSelect(teacher: Teacher): void {
    this.selectedTeacher = teacher;
  }
}
