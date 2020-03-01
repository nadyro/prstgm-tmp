import {Component, OnInit} from '@angular/core';
import {ChatService} from '../services/chat.service';
import {Observable} from 'rxjs';
import {Users} from '../../../../models/Users';
import {map} from 'rxjs/operators';
import {Message} from '../../../../models/Message';
import {AuthService} from '../services/auth.service';
import {ChatRequests} from '../../../../models/ChatRequests';
import {UsersService} from '../services/users.service';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  public users$: Observable<Users[]>;
  public selectedUser: Users;
  public messages: Message[];
  public activeChatRequest: number;
  public chatRequests: ChatRequests[];
  public crDisplayed: boolean;
  public clickCounter = 0;
  public welcomeMessage = '';
  public statusMessage = '';

  constructor(private chatService: ChatService,
              public authService: AuthService,
              private usersService: UsersService,
              private spinner: NgxSpinnerService) {
    this.users$ = this.usersService.getUsersExceptCurrent().pipe(map(users => users));
    this.crDisplayed = false;
  }

  sendSimpleMessage(message, event) {
    if (event) {
      this.chatService.sendMessage(message.previousSibling.value);
      message.previousSibling.value = '';
    } else {
      this.chatService.sendMessage(message.value);
      message.value = '';
    }
  }

  selectUser(event) {
    this.selectedUser = event[0];
    const roomId = this.authService.userProfile._id + ' & ' + this.selectedUser._id;
    console.log(roomId);
    this.chatService.initChat(roomId).subscribe((result) => {
      this.statusMessage = result;
      this.spinner.show();
    });
  }

  displayOverlay(imgDetails, v) {
    if (v === 1) {
      imgDetails.nextElementSibling.style.display = 'block';
      setTimeout(() => {
        imgDetails.nextElementSibling.style.opacity = '1';
      }, 100);
    } else {
      imgDetails.nextElementSibling.style.display = 'none';
      setTimeout(() => {
        imgDetails.nextElementSibling.style.opacity = '0';
      }, 100);
    }
  }

  getSelectedUsers(event) {
    this.selectedUser = event.requester;
  }

  resizeCr(event, cr) {
    this.activeChatRequest = this.chatRequests.length;
    if (this.clickCounter === 1) {
      this.crDisplayed = false;
      cr.style.height = '25px';
      this.clickCounter--;
    } else if (this.clickCounter === 1 && this.chatRequests.length === 0) {
      this.crDisplayed = false;
      this.clickCounter--;
    }
  }

  displayCR(element) {
    if (this.clickCounter === 0 && this.chatRequests.length > 0) {
      element.style.height = '150px';
      setTimeout(() => {
        this.crDisplayed = true;
      }, 500);
      this.clickCounter++;
    } else if (this.clickCounter === 1) {
      this.crDisplayed = false;
      element.style.height = '25px';
      this.clickCounter--;
    }
  }

  ngOnInit() {
    this.chatRequests = new Array<ChatRequests>();
    this.selectedUser = new Users();
    this.chatService.getChatRequests().subscribe(chatRequest => {
      if (!this.chatRequests.some(cr => cr.roomId === chatRequest.roomId)) {
        this.chatRequests.push(chatRequest);
      }
      this.activeChatRequest = this.chatRequests.length;
    });
    this.messages = new Array<Message>();
    this.chatService.getData('msgReceived').subscribe(message => {
      this.messages.push(message);
    });
    this.chatService.welcomeMessage().subscribe(msg => {
      this.spinner.hide();
      this.statusMessage = msg;
    });
    this.chatService.emitStatusMessage.subscribe(statusMessage => {
      this.statusMessage = statusMessage;
    });
  }

}
