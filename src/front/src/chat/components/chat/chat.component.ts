import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthService, QuoteService } from '../../services';
import { User } from '../../models/user.model';
import { loginTokenKey } from '../../services/signalr.core.service';
import { MessageStore } from 'src/chat/stores';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {

  public userName: string;
  public currentUser: User;
  public quote: string;

  constructor(
    private messageStore: MessageStore,
    private authService: AuthService,
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

  public start() { // TODO: remove this function
    if (this.userName) {
      this.login().subscribe(() => {
        this.startChat();
      });
    }
  }

  public openChat(user: User) {
    this.currentUser = user;
  }

  private login(): Observable<any> {
    return this.authService.login(this.userName);
  }

  private startChat() {
    this.messageStore.start();
  }

  private stopChat() {
    this.messageStore.stop();
  }

}
