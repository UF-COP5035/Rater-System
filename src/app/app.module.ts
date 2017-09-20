import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { MdButtonModule, MdCardModule, MdMenuModule, MdToolbarModule, MdIconModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Import the Http Module and our Data Service
import { HttpModule } from '@angular/http';
import { DataService } from './data.service';
import { SurveyComponent } from './survey/survey.component';
import { TeacherService } from './teacher-detail/teacher.service';
import { AppComponent } from './app.component';

const appRoutes: Routes = [

  {
    path: '',
    redirectTo: '/',
    pathMatch: 'full'
  },
  {
    path: 'survey',
    component: SurveyComponent,
    data: { title: 'Survey' }
  }
];


@NgModule({
  declarations: [
    AppComponent,
    SurveyComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    BrowserModule,
    HttpModule,          // <-Add HttpModule'
    BrowserAnimationsModule, // <- Add Angular Animation
    MdButtonModule,         // <- Add Angular Material
    MdMenuModule,
    MdCardModule,
    MdToolbarModule,
    MdIconModule
  ],
  providers: [DataService, TeacherService], // <-Add DataService
  bootstrap: [AppComponent]
})
export class AppModule { }
