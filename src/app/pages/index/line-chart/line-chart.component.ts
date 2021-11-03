import { Component } from '@angular/core';
import { ChartDataSets } from 'chart.js';
import { Color, Label } from 'ng2-charts';

@Component({
  selector: 'index-line-chart',
  templateUrl: './line-chart.component.html'
})
export class LineChartComponent {

  constructor() { }

  // Array of different segments in chart
  lineChartData: ChartDataSets[] = [
    { data: [90, 100, 80, 120, 100, 110, 90, 130, 110, 100, 120, 130], label: 'فروش', fill: true },
    { data: [90, 100, 80, 120, 100, 110, 90, 130, 110, 100, 120, 130], label: 'ویزیت شده', fill: true }
  ];

  //Labels shown on the x-axis
  lineChartLabels: Label[] = ["فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور", "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند"];

  options: any = {
    responsive: true,
    legend: {
      labels: {
        fontFamily: 'IRansans'
      }
    },
    scales: {
      xAxes: [{
        ticks: {
          fontFamily: 'IRansans'
        }
      }],
      yAxes: [{
        display: true
      }]
    }
  };

  // Define colors of chart segments
  lineChartColors: Color[] = [

    {
      borderColor: "#e76c90",
      pointBackgroundColor: "#e76c90",
      pointHoverBorderColor: "#e76c90",
      pointHoverBackgroundColor: "#e76c90",
      pointBorderColor: "#fff",
      backgroundColor: "rgba(231, 108, 144, 0.075)",
      borderWidth: 4,
      pointBorderWidth: 3,
      pointRadius: 6,
    },
    {
      borderColor: "#aea9c3",
      pointBackgroundColor: "#aea9c3",
      pointHoverBorderColor: "#5d5386",
      pointHoverBackgroundColor: "#5d5386",
      pointBorderColor: "#fff",
      pointBorderWidth: 3,
      pointRadius: 6,
      backgroundColor: "transparent",
      borderWidth: 3,
      borderDash: [10, 5],
    }
  ];

}
