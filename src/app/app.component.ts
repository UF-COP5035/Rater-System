import { Component, Input, OnInit, } from '@angular/core';
import { Title } from '@angular/platform-browser';

// Import the Services
import { Student } from './student/student';
import { Teacher } from './teacher/teacher';


// Would like to continue to make this into the routing component

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: []
})
export class AppComponent implements OnInit {
  teachers: Teacher[];
  selectedTeacher: Teacher;


  constructor(title: Title) {
    title.setTitle('Gator Grader');
  }

  ngOnInit(): void { }

  onSelect(teacher: Teacher): void {
    this.selectedTeacher = teacher;
  }
}
