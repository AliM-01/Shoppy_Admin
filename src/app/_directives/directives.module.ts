import { NgModule } from '@angular/core';
import { CursorPointerDirective } from './cursor-pointer/cursor-pointer.directive';
import { DivCenterContentBetweenDirective } from './div-center-content-between/div-center-content-between.directive';
import { CommonModule } from '@angular/common';
import { DivCenterDirective } from './div-center/div-center.directive';

@NgModule({
  declarations: [
    CursorPointerDirective,
    DivCenterContentBetweenDirective,
    DivCenterDirective
  ],
  imports: [CommonModule],
  exports: [
    CursorPointerDirective,
    DivCenterContentBetweenDirective,
    DivCenterDirective
  ],
  schemas: []
})
export class DirectivesModule { }
