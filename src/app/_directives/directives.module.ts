import { NgModule } from '@angular/core';
import { CursorPointerDirective } from './cursor-pointer/cursor-pointer.directive';
import { DivCnterContentBetweenDirective } from './div-center-content-between/div-center-content-between.directive';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    CursorPointerDirective,
    DivCnterContentBetweenDirective],
  imports: [CommonModule],
  exports: [
    CursorPointerDirective,
    DivCnterContentBetweenDirective
  ],
  schemas: []
})
export class DirectivesModule { }
