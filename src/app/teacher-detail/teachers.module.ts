import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';

import { TeacherDetailComponent }  from './teacher-detail.component';

import { TeacherRoutingModule } from './teacher-routing.module';
import { TeacherComponentComponent } from './teacher-component/teacher-component.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TeacherRoutingModule
  ],
  declarations: [

    TeacherDetailComponent,

    TeacherComponentComponent
  ],
 
})
export class TeachersModule {}