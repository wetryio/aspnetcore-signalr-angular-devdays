import { Injectable } from '@angular/core';
import { observable, action, computed } from 'mobx-angular';
import { Subscription, Observable } from 'rxjs';

import { Chat, User, Message } from '../models';
import { ChatService, ChatUtilsService } from '../services';

@Injectable()
export class MessageStore {

    private messageSubscription: Subscription;
    private usersSubscription: Subscription;

    @observable private _conversations: {[key: string]: Chat};
    @observable private _currentChat: Chat;
    @observable public users: User[];

    @computed public get currentChat(): Chat {
        return this._currentChat;
    }

    @computed public get currentReceiverId(): string {
        return this._currentChat.user.userId;
    }

    public get connected(): Observable<boolean> {
        return this.chatService.connected;
    }

    constructor(private chatService: ChatService, private chatUtilsService: ChatUtilsService) {
        this.init();
    }

    public getChatByUser(user: User): Chat {
        let chat = this._conversations[user.userId];
        if (!chat) {
            chat = new Chat(user);
            this._conversations = {
                ...this._conversations,
                [user.userId]: chat
            };
        }
        return chat;
    }

    @action private init() {
        this._conversations = {};
    }

    @action public switchConversation(user: User) {
        this._currentChat = this.getChatByUser(user);
        this._currentChat.user = user;
    }

    public start() {
        this.messageSubscription = this.chatService.listen().subscribe((message) => {
            this.addMessage(message);
        });
        this.usersSubscription = this.chatService.refreshUserList.subscribe(() => {
            this.refreshUserList();
        });
        this.refreshUserList();
    }

    private refreshUserList() {
        this.chatUtilsService.getUsers().subscribe(users => {
            this.updateUserList(users);
        });
    }

    @action private updateUserList(users: User[]) {
        this.users = users;
    }

    @action public stop() {
        if (this.messageSubscription) {
            this.messageSubscription.unsubscribe();
        }
        if (this.usersSubscription) {
            this.usersSubscription.unsubscribe();
        }
        this.chatService.stopListening();
        this._currentChat = null;
    }

    @action public addMessage(message: Message) {
        const chat = this.getChatByUser({ username: '?', userId: message.userId });
        chat.messages = [...chat.messages, message];
        if (message.mine) {
            this.chatService.sendMessage(message.userId, message.content);
        }
    }

}
