import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { MonitoringService } from './services/monitoring.service';
import { Message } from 'src/chat/models';

@Component({
  selector: 'app-monitoring',
  templateUrl: './monitoring.component.html',
  styleUrls: ['./monitoring.component.scss']
})
export class MonitoringComponent implements OnInit, OnDestroy {

  public messages: Message[];
  public lineChartOptions: any;
  public lineChartData: any[];
  public lineChartLabels: any[];

  constructor(private monitoringService: MonitoringService) {
    this.lineChartOptions = {
      responsive: true
    };
    this.lineChartData = [
      {data: []}
    ];
    this.lineChartLabels = [];
    this.messages = [];
  }

  ngOnInit() {
    this.monitoringService.run().subscribe();
    this.monitoringService.messageReceiver.subscribe(message => {
      this.messages.push(message);
    });
    this.monitoringService.userNumberReceiver.subscribe(userNumber => {
      this.addElementToShart(userNumber);
    });
  }

  ngOnDestroy() {
    this.monitoringService.close();
  }

  private addElementToShart(userNumber: number) {
    this.lineChartData = [
      {data: [...this.lineChartData[0].data, userNumber]}
    ];
    this.lineChartLabels = [...this.lineChartLabels, (new Date()).getSeconds.toString()];
  }

  // public test() {
  //   this.monitoringService.test();
  // }

}
