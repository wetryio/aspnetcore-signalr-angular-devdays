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

  constructor(private messageStore: MessageStore) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.user && this.user) {
      console.log('changes', this.user);
      this.messageStore.switchConversation(this.user);
    }
  }

  ngOnDestroy() {
    // this.messageStore
  }

}
