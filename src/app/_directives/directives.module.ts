import { NgModule } from '@angular/core';
import { CursorPointerDirective } from './cursor-pointer/cursor-pointer.directive';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [CursorPointerDirective],
  imports: [BrowserModule],
  exports: [
    CursorPointerDirective
  ],
  schemas: []
})
export class DirectivesModule { }
