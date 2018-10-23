import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  constructor(private chatService: ChatService) { }

  ngOnInit() {
  }

  public start() {
    this.chatService.listen().subscribe(data => {
      console.log('recreived');
    });
  }

}
