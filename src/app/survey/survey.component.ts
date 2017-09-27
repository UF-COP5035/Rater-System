import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

import { Teacher } from '../teacher-detail/teacher';
import { TeacherService } from '../teacher-detail/teacher.service';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})
export class SurveyComponent implements OnInit {
// Gathering Teacher information

teachers: Teacher[] = [];

  constructor(private teacherService: TeacherService,
              private route: ActivatedRoute,
              private location: Location
  ) { }

  ngOnInit(): void {
    this.teacherService.getTeachers()
    .then(teachers => this.teachers = teachers.slice(1,5));
  }
  goBack(): void {
    this.location.back();
  }

}
