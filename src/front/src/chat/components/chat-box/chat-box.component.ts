import { Component, OnInit, ChangeDetectionStrategy, Input, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';

import { User } from '../../models';
import { MessageStore } from '../../stores';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatBoxComponent implements OnChanges {

  @Input() user: User;

  public messageToSend: string;

  constructor(private messageStore: MessageStore) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.user && this.user) {
      this.messageStore.switchConversation(this.user);
    }
  }

  public send() {
    if (this.messageToSend) {
      this.messageStore.addMessage({
        content: this.messageToSend,
        userId: this.messageStore.currentReceiverId,
        mine: true
      });
    }
    this.messageToSend = '';
  }

}
