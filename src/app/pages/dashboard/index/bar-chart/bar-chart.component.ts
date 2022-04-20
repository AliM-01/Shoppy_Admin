/* eslint-disable @typescript-eslint/no-explicit-any */
import {Component, OnInit} from '@angular/core';
import {ReportService} from '@app_services/report/report.service';
import {ChartDataSets} from 'chart.js';
import {Color, Label} from 'ng2-charts';

@Component({
  selector: 'index-bar-chart',
  templateUrl: './bar-chart.component.html'
})
export class BarChartComponent implements OnInit {

  isLoaded = false;
  constructor(private reportService: ReportService) { }

  ngOnInit(): void {
    this.reportService.productSale().subscribe(res => {
      const data = [];

      for (const chart of res) {
        data.push(chart.count);
      }

      this.barChartData = [{data: data, label: 'فروش', fill: true}];
      this.isLoaded = true;
    })
  }

  barChartOptions: any = {
    responsive: true,
    barRoundness: 3,
    tooltips: {
      backgroundColor: 'rgba(47, 49, 66, 0.8)',
      titleFontSize: 13,
      titleFontFamily: 'IRANSans',
      titleFontColor: '#fff',
      caretSize: 0,
      cornerRadius: 4,
      xPadding: 5,
      displayColors: false,
      yPadding: 5

    },
    legend: {
      display: true,
      position: 'bottom',
      labels: {
        fontColor: "#2e3451",
        usePointStyle: true,
        padding: 50,
        fontFamily: 'IRansans',
        fontSize: 13
      }
    },
    scales: {
      xAxes: [{
        barThickness: 15,
        stacked: false,
        gridLines: {
          drawBorder: false,
          display: false
        },
        ticks: {
          fontFamily: 'IRansans',
          display: true
        }
      }],
      yAxes: [{
        stacked: false,
        gridLines: {
          drawBorder: false,
          display: false
        },
        ticks: {
          display: false
        }
      }]
    }
  };
  barChartLabels: Label[] = ["فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور", "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند"];

  barChartData: ChartDataSets[] = [
    {data: [30, 24, 22, 17, 22, 24, 9, 14, 20, 13, 17, 13], label: 'تحویل داده شده', fill: true}
  ];

  barChartColors: Color[] = [

    {
      borderColor: "#fff",
      backgroundColor: "#5d5386",
      hoverBackgroundColor: "#5d5386"
    }
  ];
}
