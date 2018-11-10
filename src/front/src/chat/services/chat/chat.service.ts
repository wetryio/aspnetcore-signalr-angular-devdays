import { Injectable } from '@angular/core';
import { Subject, Observable, timer } from 'rxjs';
import { switchMap, retryWhen, delayWhen } from 'rxjs/operators';

import { SignalRCoreService } from '../signalr.core.service';
import { SignalrMethod, SignalrMethods } from '../signalr.abstract.service';

interface ChatMethods extends SignalrMethods {
  receive: SignalrMethod;
  logout: SignalrMethod;
  updateUserList: SignalrMethod;
}

@Injectable()
export class ChatService extends SignalRCoreService<ChatMethods> {

  private _messageReceiver = new Subject<string>();
  public messageReceiver = this._messageReceiver.asObservable();

  protected url = '/chat';
  // protected methods: {[key: string]: (...args: any[]) => void} = {
  //   'Send': (data) => { console.log('Send', data); },
  //   'Receive': data => this.receive(data),
  //   'logout': () => { console.log('logout'); },
  //   'updateUserList': () => { console.log('updateUserList'); }
  // };

  protected methods: ChatMethods = {
    receive: data => this.receive(data),
    logout: () => { console.log('logout'); },
    updateUserList: () => { console.log('updateUserList'); }
  };

  constructor() {
    super();
  }

  public listen(): Observable<string> {
    return this.start().pipe(
      retryWhen(errors => {
        return errors.pipe(delayWhen(val => timer(3000)));
      }),
      switchMap(() => this.messageReceiver)
    );
  }

  public stopListening(): void {
    this.stop();
  }

  private receive(data) {
    console.log('reveive', data);
    this._messageReceiver.next(data);
  }

  public sendMessage(receiverId: string, message: string): void {
    this.send('', {});
  }

}
