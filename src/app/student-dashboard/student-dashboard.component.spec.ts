import { async, ComponentFixture, TestBed } from '@angular/core/testing';
<<<<<<< HEAD
import { ActivatedRoute, RouterModule, Routes, Router, ParamMap, provideRoutes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import {
  MatCardModule, MatMenuModule, MatToolbarModule,
  MatIconModule, MatInputModule, MatButtonModule,
  MatFormFieldModule, MatSelectModule
} from '@angular/material';

import { StudentDashboardComponent } from './student-dashboard.component';

class TestRouterComponent { }
const config: Routes = [
  { path: 'review', component: TestRouterComponent }
];

describe('StudentDashboardComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatMenuModule, RouterModule, RouterTestingModule],
      providers: [provideRoutes(config)],
      declarations: [
        StudentDashboardComponent
      ]
    }).compileComponents();
  }));


  
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(StudentDashboardComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  
  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(StudentDashboardComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome');
  }));
=======

import { StudentDashboardComponent } from './student-dashboard.component';

describe('StudentDashboardComponent', () => {
  let component: StudentDashboardComponent;
  let fixture: ComponentFixture<StudentDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
>>>>>>> d71f38f0842ba4bbe1a63c369b8cb50d602c7c7b
});
