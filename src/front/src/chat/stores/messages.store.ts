import { Injectable } from '@angular/core';
import { observable, action, computed } from 'mobx-angular';
import { Subscription } from 'rxjs';

import { Chat, User, Message } from '../models';
import { ChatService } from '../services';

@Injectable()
export class MessageStore {

    private connectionSubscription: Subscription;

    @observable private _conversations: {[key: string]: Chat};
    @observable private _currentChat: Chat;

    @computed public get currentChat(): Chat {
        return this._currentChat;
    }

    constructor(private chatService: ChatService) {
        this.init();
        setTimeout(() => {
            this.addMessage({ userId: '', content: 'test' });
        }, 3000);

    }

    @action private init() {
        this._conversations = {};
    }

    @action public switchConversation(user: User) {
        this.stop();
        let chat = this._conversations[user.userId];
        if (!chat) {
            chat = new Chat(user);
            this._conversations = {
                ...this._conversations,
                [user.userId]: chat
            };
            // this._conversations[user.userId]
        }
        this._currentChat = chat;
        this.start();
    }

    @action public addMessage(message: Message) {
        this.currentChat.messages = [...this.currentChat.messages, message];
    }

    private start() {
        this.connectionSubscription = this.chatService.listen().subscribe((message) => {
            this.addMessage({ userId: '', content: message });
        });
    }

    @action public stop() {
        if (this.connectionSubscription) {
            this.connectionSubscription.unsubscribe();
        }
        this.chatService.stopListening();
        this._currentChat = null;
    }

}
