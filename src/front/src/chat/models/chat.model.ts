import { observable } from 'mobx-angular';

import { User } from './user.model';
import { Message } from './message.model';

export class Chat {

    public user: User;
    @observable public messages: Message[];

    constructor(
        user: User
    ) {
        this.user = user;
        this.messages = [];
    }

}
