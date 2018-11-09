import { Injectable } from '@angular/core';
import { observable, action, computed } from 'mobx-angular';

import { Chat, User, Message } from '../models';
import { ChatService } from '../services';

@Injectable()
export class MessageStore {

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
        this.chatService.listen().subscribe((message) => {
            this.addMessage({ userId: '', content: message });
        });
    }

    @action public stop() {
        this.chatService.stopListening();
        this._currentChat = null;
    }

}
