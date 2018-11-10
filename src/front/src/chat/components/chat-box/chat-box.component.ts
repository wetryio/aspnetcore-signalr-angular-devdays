import { Component, OnInit, ChangeDetectionStrategy, Input, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';

import { User } from '../../models';
import { MessageStore } from '../../stores';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatBoxComponent implements OnInit, OnChanges, OnDestroy {

  @Input() user: User;

  public messageToSend: string;

  constructor(private messageStore: MessageStore) { }

  ngOnInit() {
    // setTimeout(() => {
    //   this.messageStore.stop();
    // }, 10000);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.user && this.user) {
      console.log('changes', this.user);
      this.messageStore.switchConversation(this.user);
    }
  }

  ngOnDestroy() {
    this.messageStore.stop();
  }

  public send() {
    if (this.messageToSend) {
      this.messageStore.addMessage({
        content: this.messageToSend,
        userId: '',
        mine: true
      });
    }
    this.messageToSend = '';
  }

}
