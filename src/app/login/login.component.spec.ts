import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule, MatMenuModule, MatToolbarModule, MatIconModule, MatInputModule, MatButtonModule, MatFormFieldModule, MatSelectModule } from '@angular/material';
import { Component, OnInit, Injectable } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import { Headers, Http } from '@angular/http';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AdministratorService } from '../administrator/administrator.service';
import { TeacherService } from '../teacher/teacher.service';
import { StudentService } from '../student/student.service';
import { Administrator } from '../administrator/administrator';
import { Teacher} from '../teacher/teacher';
import { Student } from '../student/student';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
