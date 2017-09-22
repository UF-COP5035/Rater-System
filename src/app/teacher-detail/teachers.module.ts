import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';

import { TeacherDetailComponent }  from './teacher-detail.component';

import { TeacherRoutingModule } from './teacher-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TeacherRoutingModule
  ],
  declarations: [

    TeacherDetailComponent
 ],
 
})
export class TeachersModule {}