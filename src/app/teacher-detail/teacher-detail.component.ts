import { Component, OnInit } from '@angular/core';
import {Teacher} from './teacher';
import {TeacherService} from './teacher.service';

@Component({
  selector: 'app-teacher-detail',
  templateUrl: './teacher-detail.component.html',
  styleUrls: ['./teacher-detail.component.css']
})
export class TeacherDetailComponent implements OnInit {

  teacher: Teacher;

  constructor() { }

  ngOnInit() {
  }

}
