import { NgModule } from '@angular/core';
import { CursorPointerDirective } from './cursor-pointer/cursor-pointer.directive';
import { DivCenterContentBetweenDirective } from './div-center-content-between/div-center-content-between.directive';
import { CommonModule } from '@angular/common';
import { DivCenterDirective } from './div-center/div-center.directive';
import { DivCenterContentCenterDirective } from './div-center-content-center/div-center-content-center.directive';

@NgModule({
  declarations: [
    CursorPointerDirective,
    DivCenterContentBetweenDirective,
    DivCenterDirective,
    DivCenterContentCenterDirective
  ],
  imports: [CommonModule],
  exports: [
    CursorPointerDirective,
    DivCenterContentBetweenDirective,
    DivCenterDirective,
    DivCenterContentCenterDirective
  ],
  schemas: []
})
export class DirectivesModule { }
