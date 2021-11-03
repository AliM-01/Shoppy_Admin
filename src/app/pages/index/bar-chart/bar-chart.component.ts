import { Component } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';

@Component({
  selector: 'index-bar-chart',
  templateUrl: './bar-chart.component.html'
})
export class BarChartComponent {

  constructor() { }

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
      },
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
    { data: [30, 24, 22, 17, 22, 24, 9, 14, 20, 13, 17, 13], label: 'تحویل داده شده', fill: true },
    { data: [10, 14, 12, 20, 20, 8, 10, 20, 7, 11, 8, 10], label: 'برآورد شده', fill: true }
  ];

  barChartColors: Color[] = [

    {
      borderColor: "#fff",
      backgroundColor: "#de1759",
      hoverBackgroundColor: "#de1759"
    },
    {
      borderColor: "#fff",
      backgroundColor: "#5d5386",
      hoverBackgroundColor: "#5d5386"
    }
  ];
}
