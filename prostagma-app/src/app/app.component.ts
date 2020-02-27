import {Component, OnInit} from '@angular/core';
import {ChatService} from './services/chat.service';
import {AuthService} from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public counter = 0;
  public notification: string;
  title = 'prostagma';
  // constructor(private chatService: ChatService, private authService: AuthService) {
  // }

  ngOnInit() {
    // this.notification = '';
    // this.chatService.checkFulfilled().subscribe(chatRequest => {
    //   if (chatRequest.recipient._id === this.authService.userProfile._id) {
    //     this.notification = chatRequest.roomId;
    //     this.counter++;
    //   }
    // });
  }
}
