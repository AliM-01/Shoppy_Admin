import { NgModule } from '@angular/core';
import { CursorPointerDirective } from './cursor-pointer/cursor-pointer.directive';
import { DivCenterContentBetweenDirective } from './div-center-content-between/div-center-content-between.directive';
import { CommonModule, DecimalPipe } from '@angular/common';
import { DivCenterDirective } from './div-center/div-center.directive';
import { DivCenterContentCenterDirective } from './div-center-content-center/div-center-content-center.directive';
import { ThousandSepratorDirective } from './thousand-seprator/thousand-seprator.directive';
import { MatCommonModule } from '@angular/material/core';

@NgModule({
  declarations: [
    CursorPointerDirective,
    DivCenterContentBetweenDirective,
    DivCenterDirective,
    DivCenterContentCenterDirective,
    ThousandSepratorDirective
  ],
  imports: [CommonModule, MatCommonModule],
  exports: [
    CursorPointerDirective,
    DivCenterContentBetweenDirective,
    DivCenterDirective,
    DivCenterContentCenterDirective,
    ThousandSepratorDirective
  ],
  schemas: [],
  providers: [DecimalPipe]
})
export class DirectivesModule { }
