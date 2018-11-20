import { Component, ChangeDetectionStrategy, Input, OnChanges, SimpleChanges } from '@angular/core';

import { User } from '../../models';
import { MessageStore } from '../../stores';

@Component({
  selector: 'app-message-box',
  templateUrl: './message-box.component.html',
  styleUrls: ['./message-box.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessageBoxComponent implements OnChanges {

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
