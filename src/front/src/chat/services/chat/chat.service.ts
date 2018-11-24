import { Injectable, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { SignalRCoreService, SignalrMethods, SignalrMethod } from '../../../core/services/abstracts/signalr';
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

  private _refreshUserList = new EventEmitter<boolean>();
  public refreshUserList = this._refreshUserList.asObservable();

  protected url = '/chat';

  protected methods: ChatMethods = {
    receive: (...data) => this.receive(...data),
    logout: () => { console.log('logout'); },
    updateUserList: () => this._refreshUserList.emit(true)
  };

  constructor(private router: Router) {
    super();
  }

  protected logout(): void {
    super.logout();
    this.router.navigate(['/auth']);
  }

  public listen(): Observable<Message> {
    return this.start().pipe(
      switchMap(() => this.messageReceiver)
    );
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
