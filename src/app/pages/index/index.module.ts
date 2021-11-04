import { NgModule } from '@angular/core';
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
    ChartsModule
  ],
  exports: [
    IndexComponent,
    LineChartComponent,
    BarChartComponent
  ],
  schemas: []
})
export class IndexModule { }
