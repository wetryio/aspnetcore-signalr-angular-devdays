import { Injectable, EventEmitter } from '@angular/core';
import { Subject, Observable, timer } from 'rxjs';
import { switchMap, retryWhen, delayWhen } from 'rxjs/operators';

import { SignalRCoreService } from '../signalr.core.service';
import { SignalrMethod, SignalrMethods } from '../signalr.abstract.service';
import { Message } from '../../../chat/models';

interface ChatMethods extends SignalrMethods {
  receive: SignalrMethod;
  logout: SignalrMethod;
  updateUserList: SignalrMethod;
}

@Injectable()
export class ChatService extends SignalRCoreService<ChatMethods> {

  private _messageReceiver = new Subject<Message>();
  public messageReceiver = this._messageReceiver.asObservable();

  private _refreshList = new EventEmitter<boolean>();
  public refreshList = this._refreshList.asObservable();

  protected url = '/chat';
  // protected methods: {[key: string]: (...args: any[]) => void} = {
  //   'Send': (data) => { console.log('Send', data); },
  //   'Receive': data => this.receive(data),
  //   'logout': () => { console.log('logout'); },
  //   'updateUserList': () => { console.log('updateUserList'); }
  // };

  protected methods: ChatMethods = {
    receive: (...data) => this.receive(...data),
    logout: () => { console.log('logout'); },
    updateUserList: () => {
      console.log('updateUserList');
      this._refreshList.emit(true);
    }
  };

  constructor() {
    super();
  }

  public run(): Observable<any> {
    return this.start();
  }

  public listen(): Observable<Message> {
    // return this.start().pipe(
    //   retryWhen(errors => {
    //     return errors.pipe(delayWhen(val => timer(3000)));
    //   }),
    //   switchMap(() => this.messageReceiver)
    // );
    return this.messageReceiver;
  }

  public stopListening(): void {
    this.stop();
  }

  private receive(...data: any[]) {
    console.log('reveive', data);
    this._messageReceiver.next({
      userId: data[0],
      content: data[1]
    });
  }

  public sendMessage(receiverId: string, message: string): void {
    this.send('SendMessageToUserAsync', receiverId, message);
  }

}
