import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';

import { QuoteService } from '../../services';
import { User } from '../../models/user.model';
import { loginTokenKey } from '../../../core/services/abstracts/signalr/signalr.core.service';
import { MessageStore } from 'src/chat/stores';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {

  public currentUser: User;
  public quote: string;

  constructor(
    private messageStore: MessageStore,
    private quoteService: QuoteService
    ) { }

  ngOnInit() {
    if (localStorage.getItem(loginTokenKey)) { // TODO: remove if
      this.startChat();
    }
    this.quoteService.run().subscribe(quote => this.quote = quote); // TODO: unsubscribe this on destroy
  }

  ngOnDestroy() {
    this.stopChat();
  }



  public openChat(user: User) {
    this.currentUser = user;
  }

  private startChat() {
    this.messageStore.start();
  }

  private stopChat() {
    this.messageStore.stop();
  }

}
