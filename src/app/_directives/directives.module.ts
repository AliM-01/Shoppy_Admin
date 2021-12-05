import { NgModule } from '@angular/core';
import { CursorPointerDirective } from './cursor-pointer/cursor-pointer.directive';
import { BrowserModule } from '@angular/platform-browser';
import { DivCnterContentBetweenDirective } from './div-center-content-between/div-center-content-between.directive';

@NgModule({
  declarations: [
    CursorPointerDirective,
    DivCnterContentBetweenDirective],
    
  imports: [BrowserModule],
  exports: [
    CursorPointerDirective,
    DivCnterContentBetweenDirective
  ],
  schemas: []
})
export class DirectivesModule { }
