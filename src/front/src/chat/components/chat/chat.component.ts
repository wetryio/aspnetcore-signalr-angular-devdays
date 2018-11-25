import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from '../../models/user.model';
// import { loginTokenKey } from '../../../core/services/abstracts/signalr/signalr.core.service';
import { MessageStore } from '../../stores';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {

  public currentUser: User;

  constructor(
    public messageStore: MessageStore
    ) { }

  ngOnInit() {
    this.startChat();
  }

  ngOnDestroy() {
    this.stopChat();
  }

  private startChat() {
    this.messageStore.start();
  }

  private stopChat() {
    this.messageStore.stop();
  }

  public chooseUser(user: User) {
    this.currentUser = user;
  }

}
