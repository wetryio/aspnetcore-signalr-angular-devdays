import { Injectable } from '@angular/core';
import { SignalRCoreService, SignalrMethods, SignalrMethod } from 'src/core/services/abstracts/signalr';

interface MonitoringMethods extends SignalrMethods {
  UpdateMessages: SignalrMethod;
  MessageReceive: SignalrMethod;
  UpdateUsers: SignalrMethod;
}

@Injectable({
  providedIn: 'root'
})
export class MonitoringService extends SignalRCoreService<MonitoringMethods> {

  protected url = '/dashboard';

  protected methods: MonitoringMethods = {
    UpdateMessages: (...data) => console.log(data),
    MessageReceive: (...data) => { console.log(data); },
    UpdateUsers: (...data) => console.log(data)
  };

  constructor() {
    super();
  }

  public run() {
    return this.start();
  }

  public close() {
    this.stop();
  }

  public refreshQuote() {
    this.send('', '');
  }

  public test() {
    this.send('Test', 'coucou');
  }

}
