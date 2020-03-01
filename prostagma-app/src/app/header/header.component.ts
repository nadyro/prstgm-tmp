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
  public clickCounter = 0;

  constructor(public authService: AuthService, private chatService: ChatService) {
  }

  displayMobileHeader(menu, menuDisplayer) {
    const elemHeight = 35 * 4;
    const menuName = menuDisplayer.childNodes[1];
    if (this.clickCounter === 0) {
      setTimeout(() => {
        menu.style.display = 'block';
      }, 400);
      menuDisplayer.style.height = elemHeight + 'px';
      menuDisplayer.style.width = '175px';
      menuDisplayer.style.borderTopLeftRadius = 0;
      menuDisplayer.style.borderBottomLeftRadius = 0;
      menuName.style.top = 0;
      menuName.style.transform = 'translateY(0%)';
      menuName.childNodes[1].style.transform = 'rotate(180deg)';
      this.clickCounter++;
    } else {
      menu.style.display = 'none';
      menuDisplayer.style.height = '60px';
      menuDisplayer.style.width = '60px';
      menuDisplayer.style.borderTopLeftRadius = '35px';
      menuDisplayer.style.borderBottomLeftRadius = '35px';
      menuName.style.top = '50%';
      menuName.style.transform = 'translateY(-50%)';
      menuName.childNodes[1].style.transform = 'rotate(0deg)';
      this.clickCounter--;
    }
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
