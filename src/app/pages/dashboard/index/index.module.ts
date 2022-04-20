import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {IndexComponent} from './index.component';
import {BarChartComponent} from './bar-chart/bar-chart.component';
import {LineChartComponent} from './line-chart/line-chart.component';
import {ChartsModule} from 'ng2-charts';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {ReportService} from '@app_services/report/report.service';



@NgModule({
  declarations: [
    IndexComponent,
    LineChartComponent,
    BarChartComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ChartsModule
  ],
  exports: [
    IndexComponent,
    LineChartComponent,
    BarChartComponent
  ],
  providers: [ReportService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class IndexModule { }
