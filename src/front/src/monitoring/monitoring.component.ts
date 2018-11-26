import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { MonitoringService } from './services/monitoring.service';

@Component({
  selector: 'app-monitoring',
  templateUrl: './monitoring.component.html',
  styleUrls: ['./monitoring.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MonitoringComponent implements OnInit, OnDestroy {

  public lineChartOptions: any;
  public lineChartData: any[];
  public lineChartLabels: any[];

  constructor(private monitoringService: MonitoringService) {
    this.lineChartOptions = {
      responsive: true
    };
    this.lineChartData = [
      {data: [65, 59, 80, 81, 56, 55, 40]}
    ];
    this.lineChartLabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  }

  ngOnInit() {
    this.monitoringService.run().subscribe();
  }

  ngOnDestroy() {
    this.monitoringService.close();
  }

  public test() {
    this.monitoringService.test();
  }

}
