import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ThousandSeperatorPipe} from './thousand-seperator/thousand-seperator.pipe';

@NgModule({
  declarations: [
    ThousandSeperatorPipe
  ],
  imports: [CommonModule],
  exports: [
    ThousandSeperatorPipe
  ],
  schemas: []
})
export class PipesModule { }
