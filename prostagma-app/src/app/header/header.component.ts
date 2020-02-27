import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {ChatService} from "../services/chat.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public counter = 0;
  public notification: string;

  constructor(public authService: AuthService, private chatService: ChatService) {
  }

  ngOnInit() {
    this.notification = '';
    this.chatService.checkFulfilled().subscribe(chatRequest => {
      if (chatRequest.recipient._id === this.authService.userProfile._id) {
        this.notification = chatRequest.roomId;
        this.counter++;
      }
    });
  }

}
