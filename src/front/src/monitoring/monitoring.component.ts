import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-monitoring',
  templateUrl: './monitoring.component.html',
  styleUrls: ['./monitoring.component.scss']
})
export class MonitoringComponent implements OnInit {

  public lineChartOptions: any;
  public lineChartData: any[];
  public lineChartLabels: any[];

  constructor() {
    this.lineChartOptions = {
      responsive: true
    };
    this.lineChartData = [
      {data: [65, 59, 80, 81, 56, 55, 40]}
    ];
    this.lineChartLabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  }

  ngOnInit() {
  }

}
