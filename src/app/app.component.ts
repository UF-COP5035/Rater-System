import { Component, Input, OnInit } from '@angular/core';

// Import the DataService
import { DataService } from './data.service';
import { Student } from './student';
import { Teacher } from './teacher-detail/teacher';
import { TeacherService } from './teacher-detail/teacher.service'

const STUDENTS: Student[] = [
  { id: 11, firstName: 'Ciara', lastName: 'Powell' },
  { id: 12, firstName: 'Jon', lastName: 'Adams' },
  { id: 13, firstName: 'Jim', lastName: 'Bob' },
];


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [TeacherService]
})
export class AppComponent implements OnInit {
  teachers: Teacher[];
  selectedTeacher: Teacher;


  constructor(private teacherService: TeacherService) { }

  getTeachers(): void {
    this.teacherService.getTeachers().then(teachers => this.teachers = teachers);
  }

  ngOnInit(): void {
    this.getTeachers();
  }

  onSelect(teacher: Teacher): void {
    this.selectedTeacher = teacher;
  }
}