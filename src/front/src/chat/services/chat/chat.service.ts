import { Injectable, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { SignalRCoreService, SignalrMethods, SignalrMethod } from '../../../core/services/abstracts/signalr';
import { Message } from '../../../chat/models';

interface ChatMethods extends SignalrMethods {
}

@Injectable()
export class ChatService extends SignalRCoreService<ChatMethods> {

  protected url = '/chat';

  protected methods: ChatMethods = {
  };

  constructor(private router: Router) {
    super();
  }

  protected logout(): void {
  }

  /**
   * Start messages listening
   */
  public listen(): Observable<Message> {
    return of(null);
  }

  /**
   * Stop messages listening
   */
  public stopListening(): void {
    this.stop();
  }

  /**
   * Message received business
   * @param data 0 = userId, 1 = message content
   */
  private receive(...data: any[]) {
  }

  /**
   * Send message
   */
  public sendMessage(receiverId: string, message: string): void {
  }

}
