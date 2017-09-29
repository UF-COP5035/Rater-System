import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MdInputModule, MdFormFieldModule } from '@angular/material';
import { ActivatedRoute, RouterModule, Routes } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SurveyComponent } from './survey.component';
import { TeacherService } from '../teacher-detail/teacher.service';

const appRoutes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: 'survey', component: SurveyComponent, data: { title: 'Survey' } }
];

describe('SurveyComponent', () => {
  let component: SurveyComponent;
  let fixture: ComponentFixture<SurveyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, MdFormFieldModule, MdInputModule, RouterModule.forRoot(appRoutes)],
      declarations: [SurveyComponent],
      providers: [TeacherService, { provide: APP_BASE_HREF, useValue: '/' }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
