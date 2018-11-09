import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';

import { ChatService, AuthService, ChatUtilsService } from '../../services';
import { User } from '../../models/user.model';
import { loginTokenKey } from '../../services/signalr.core.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {

  public userName: string;
  public users: User[];

  constructor(
    private chatService: ChatService,
    private authService: AuthService,
    private chatUtilsService: ChatUtilsService
    ) { }

  ngOnInit() {
    // #region to code quicker
    if (localStorage.getItem(loginTokenKey)) {
      this.startChat();
      this.getUsers();
    }
    // #endregion
  }

  ngOnDestroy() {
    this.chatService.stopListening();
  }

  public start() {
    if (this.userName) {
      this.login().subscribe(() => {
        this.startChat();
        this.getUsers();
      });
    }
  }

  public openChat(user: User) {
    console.log('open', user);
  }

  private login(): Observable<any> {
    return this.authService.login(this.userName);
  }

  private startChat() {
    this.chatService.listen().subscribe(data => {
      console.log('recreived', data);
    });
  }

  private getUsers() {
    this.chatUtilsService.getUsers().subscribe(users => {
      console.log('users', users);
      this.users = users;
    });
  }

}
