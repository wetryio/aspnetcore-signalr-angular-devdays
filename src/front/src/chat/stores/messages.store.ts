import { Injectable } from '@angular/core';
import { observable, action, computed } from 'mobx-angular';
import { Subscription, Observable, of } from 'rxjs';

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

    constructor(private chatUtilsService: ChatUtilsService, private chatService: ChatService) {
        this.init();
    }

    /**
     * Get chat object for one user.
     * Return history if chat already exist otherwise new chat object.
     */
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

    /**
     * Init store
     */
    @action private init() {
        this._conversations = {};
    }

    /**
     * Change current chat by user
     */
    @action public switchConversation(user: User) {
        this._currentChat = this.getChatByUser(user);
        this._currentChat.user = user;
    }

    /**
     * Start chat jobs
     */
    public start() {
        this.messageSubscription = this.chatService.listen().subscribe((message) => {
            this.addMessage(message);
        });
        this.usersSubscription = this.chatService.refreshUserList.subscribe(() => {
            this.refreshUserList();
        });
        this.refreshUserList();
    }

    /**
     * Stop chat jobs
     */
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

    /**
     * Get user list from service and set it into `users` attribute
     */
    private refreshUserList() {
        this.chatUtilsService.getUsers().subscribe(users => {
            this.updateUserList(users);
        });
    }

    /**
     * Set new list into `users` attribute
     */
    @action private updateUserList(users: User[]) {
        this.users = users;
    }

    /**
     * Add message to conversations of attached user
     */
    @action public addMessage(message: Message) {
        const chat = this.getChatByUser({ username: '?', userId: message.userId });
        chat.messages = [...chat.messages, message];
        if (message.mine) {
            this.chatService.sendMessage(message.userId, message.content);
        }
    }

}
