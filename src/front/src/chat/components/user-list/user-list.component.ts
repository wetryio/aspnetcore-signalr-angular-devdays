import { Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';

import { User } from 'src/chat/models';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserListComponent implements OnInit {

  @Input() public users: User[];
  @Input() public choice: User;
  @Output() private choiceChange = new EventEmitter<User>();

  public userSearch: string;

  constructor() { }

  ngOnInit() {
  }

  public choose(user: User) {
    this.choice = user;
    this.choiceChange.emit(this.choice);
  }

}
