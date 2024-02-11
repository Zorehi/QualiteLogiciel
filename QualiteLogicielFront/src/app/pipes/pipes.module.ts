import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArrayNumberToDatePipe } from './array-number-to-date.pipe';



@NgModule({
  declarations: [
    ArrayNumberToDatePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ArrayNumberToDatePipe
  ]
})
export class PipesModule { }
