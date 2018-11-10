import { Injectable } from '@angular/core';
import { observable, action, computed } from 'mobx-angular';
import { Subscription, Observable } from 'rxjs';

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

    public get connected(): Observable<boolean> {
        return this.chatService.connected;
    }

    constructor(private chatService: ChatService) {
        this.init();
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
        }
        this._currentChat = chat;
        this.start();
        // TODO: remove next lines
        // setTimeout(() => {
        //     this.addMessage({ userId: '', content: 'test' });
        // }, 3000);
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

    @action public addMessage(message: Message) {
        this.currentChat.messages = [...this.currentChat.messages, message];
        if (message.mine) {
            this.chatService.sendMessage(this.currentChat.user.userId, message.content);
        }
    }

}
