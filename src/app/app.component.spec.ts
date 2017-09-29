import { RouterTestingModule } from '@angular/router/testing';
import { TestBed, async } from '@angular/core/testing';
import { MdMenuModule } from '@angular/material';
import { provideRoutes, Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';

class TestRouterComponent { }

const config: Routes = [
  { path: '', component: TestRouterComponent }
];

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MdMenuModule, RouterModule, RouterTestingModule],
      providers: [provideRoutes(config)],
      declarations: [
        AppComponent
      ]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Gator Grader');
  }));
});
