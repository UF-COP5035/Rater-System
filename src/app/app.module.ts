import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdButtonModule, MdCardModule, MdMenuModule, MdToolbarModule, MdIconModule,MdInputModule  } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes }   from '@angular/router';

// Import the Http Module and our Data Service
import { HttpModule } from '@angular/http';
import { DataService } from './data.service';
import { SurveyComponent } from './survey/survey.component';
import { TeacherDetailComponent } from './teacher-detail/teacher-detail.component';
import { TeacherService } from './teacher-detail/teacher.service';
import { AppComponent } from './app.component';

const appRoutes: Routes = [
  
  { path: '',
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
    SurveyComponent,
    TeacherDetailComponent
  ],
  imports: [
      RouterModule.forRoot(
        appRoutes,
        { enableTracing: true } // <-- debugging purposes only
      ),
    BrowserModule,
    HttpModule    ,          // <-Add HttpModule'
    BrowserAnimationsModule, // <- Add Angular Animation
    MdButtonModule,         // <- Add Angular Material 
    MdMenuModule,
    MdCardModule,
    FormsModule,
    MdToolbarModule,
    MdInputModule,
    MdIconModule   

  ],
  providers: [DataService, TeacherService ], // <-Add DataService
  bootstrap: [AppComponent]
})
export class AppModule { }
