import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './index.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { LineChartComponent } from './line-chart/line-chart.component';
import { ChartsModule } from 'ng2-charts';



@NgModule({
  declarations: [
    IndexComponent,
    LineChartComponent,
    BarChartComponent
  ],
  imports: [
    CommonModule,
    ChartsModule
  ],
  exports: [
    IndexComponent,
    LineChartComponent,
    BarChartComponent
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ]
})
export class IndexModule { }
