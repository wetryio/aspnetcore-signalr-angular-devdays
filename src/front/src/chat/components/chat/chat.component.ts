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
  public currentUser: User;

  constructor(
    private chatService: ChatService,
    private authService: AuthService,
    private chatUtilsService: ChatUtilsService
    ) { }

  ngOnInit() {
    // #region to code quicker
    // if (localStorage.getItem(loginTokenKey)) {
    //   this.startChat();
    //   this.getUsers();
    // }
    setTimeout(() => {
      this.users = [
        { userId: '12', username: 'Bob' },
        { userId: '11', username: 'Bobiii' },
      ];
      // this.currentUser = { userId: '12', username: 'Bob' };
    }, 1000);
    // setTimeout(() => {
    //   this.currentUser = { userId: '11', username: 'Bobii' };
    // }, 2000);
    // #endregion
  }

  ngOnDestroy() {
    // this.chatService.stopListening();
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
    this.currentUser = user;
  }

  private login(): Observable<any> {
    return this.authService.login(this.userName);
  }

  private startChat() {
    // const subscription = this.chatService.listen().subscribe(data => {
    //   console.log('recreived', data);
    // });
    // subscription.unsubscribe();
  }

  private getUsers() {
    this.chatUtilsService.getUsers().subscribe(users => {
      console.log('users', users);
      this.users = users;
    });
  }

}
