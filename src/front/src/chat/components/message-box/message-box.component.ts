import { Component, ChangeDetectionStrategy, Input, OnChanges,
  SimpleChanges, ViewChild, ElementRef, OnDestroy, AfterViewInit } from '@angular/core';

import { reaction, IReactionDisposer } from 'mobx';

import { User } from '../../models';
import { MessageStore } from '../../stores';

@Component({
  selector: 'app-message-box',
  templateUrl: './message-box.component.html',
  styleUrls: ['./message-box.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessageBoxComponent implements AfterViewInit, OnChanges, OnDestroy {

  @Input() user: User;
  @ViewChild('history') history: ElementRef;
  @ViewChild('input') input: ElementRef;

  public messageToSend: string;
  private messageReactionDisposer: IReactionDisposer;

  constructor(private messageStore: MessageStore) { }

  ngAfterViewInit() {
    this.initSubmitOnEnter();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.user && this.user) {
      this.messageStore.switchConversation(this.user);
      this.initScroll();
    }
  }

  ngOnDestroy() {
    if (this.messageReactionDisposer) {
      this.messageReactionDisposer();
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

  private initSubmitOnEnter() {
    this.input.nativeElement.addEventListener('keypress', (event: KeyboardEvent) => {
      if (event.which === 13) {
        this.send();
        event.preventDefault();
        this.input.nativeElement.value = '';
      }
    });
  }

  private initScroll() {
    if (!this.messageReactionDisposer) {
      this.messageReactionDisposer = reaction(() => this.messageStore.currentChat.messages, () => {
        setTimeout(() => { // whait that message is added to view
          this.scrollBottom();
        }, 0);
      });
    }
    this.scrollBottom();
  }

  private scrollBottom() {
    const element = this.history.nativeElement;
    const scrollTo = element.scrollHeight;
    element.scrollTo(0, scrollTo);
  }

}
