import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { SignalRCoreService } from '../signalr.core.service';

@Injectable()
export class ChatService extends SignalRCoreService {

  private _messageReceiver = new Subject<string>();
  public messageReceiver = this._messageReceiver.asObservable();

  protected url = '/chat';
  protected methods: {[key: string]: (...args: any[]) => void} = {
    'Send': (data) => { console.log('Send', data); },
    'Receive': data => this.receive(data),
    'logout': () => { console.log('logout'); },
    'updateUserList': () => { console.log('updateUserList'); }
  };

  constructor() {
    super();
  }

  public listen(): Observable<string> {
    return this.start().pipe(switchMap(() => this.messageReceiver));
  }

  public stopListening(): void {
    this.stop();
  }

  private receive(data) {
    console.log('reveive', data);
    this._messageReceiver.next(data);
  }

  public sentMessage(receiverId: string, message: string): void {
    this.send('', {});
  }

}
