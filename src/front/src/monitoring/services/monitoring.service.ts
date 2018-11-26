import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { SignalRCoreService, SignalrMethods, SignalrMethod } from 'src/core/services/abstracts/signalr';
import { Message } from 'src/chat/models';

interface MonitoringMethods extends SignalrMethods {
  UpdateMessages: SignalrMethod;
  MessageReceive: SignalrMethod;
  UpdateUsers: SignalrMethod;
}

@Injectable({
  providedIn: 'root'
})
export class MonitoringService extends SignalRCoreService<MonitoringMethods> {

  private _messageReceiver = new Subject<Message>();
  public messageReceiver = this._messageReceiver.asObservable();
  private _userNumberReceiver = new Subject<number>();
  public userNumberReceiver = this._userNumberReceiver.asObservable();

  protected url = '/dashboard';

  protected methods: MonitoringMethods = {
    UpdateMessages: (...data) => console.log(data),
    MessageReceive: (...data) => this.received(data),
    UpdateUsers: (data) => this._userNumberReceiver.next(data)
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

  private received(data: any[]) {
    this._messageReceiver.next({
      userId: data[0],
      content: data[1]
    });
  }

}
