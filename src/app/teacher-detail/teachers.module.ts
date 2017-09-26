import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';

import { TeacherDetailComponent }  from './teacher-detail.component';


// Module for Teacher Component
@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [

    TeacherDetailComponent
 ],
 
})
export class TeachersModule {}