import { Component, OnInit } from '@angular/core';
import { ChartDataSets } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { ReportService } from '@app_services/report/report.service';

@Component({
  selector: 'index-line-chart',
  templateUrl: './line-chart.component.html'
})
export class LineChartComponent implements OnInit {

  isLoaded: boolean = false;
  lineChartData: ChartDataSets[] = [
    { data: [90, 100, 80, 120, 100, 110, 90, 130, 110, 100, 120, 130], label: 'فروش', fill: true }
  ];

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
    }
  ];

  constructor(private reportService: ReportService) { }

  ngOnInit(): void {
    this.reportService.orders().subscribe(res => {
        const data = [];

        for (const chart of res) {
          data.push(chart.count);
        }

        this.lineChartData = [{ data: data, label: 'فروش', fill: true }];
        this.isLoaded = true;
    })
  }


}
