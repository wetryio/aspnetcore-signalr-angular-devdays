import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { MonitoringService } from './services/monitoring.service';
import { Message } from 'src/chat/models';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-monitoring',
  templateUrl: './monitoring.component.html',
  styleUrls: ['./monitoring.component.scss']
})
export class MonitoringComponent implements OnInit, OnDestroy {

  private runSubscription: Subscription;
  private messageSubscription: Subscription;
  private userNumberSubscription: Subscription;

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
    this.runSubscription = this.monitoringService.run().subscribe();
    this.messageSubscription = this.monitoringService.messageReceiver.subscribe(message => {
      this.messages.push(message);
    });
    this.userNumberSubscription = this.monitoringService.userNumberReceiver.subscribe(userNumber => {
      this.addElementToShart(userNumber);
    });
  }

  ngOnDestroy() {
    if (this.runSubscription) {
      this.runSubscription.unsubscribe();
    }
    if (this.messageSubscription) {
      this.messageSubscription.unsubscribe();
    }
    if (this.userNumberSubscription) {
      this.userNumberSubscription.unsubscribe();
    }
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
