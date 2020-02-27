import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ChatRequests} from "../../../../models/ChatRequests";
import {ChatService} from "../services/chat.service";

@Component({
  selector: 'app-chat-requests',
  templateUrl: './chat-requests.component.html',
  styleUrls: ['./chat-requests.component.scss']
})
export class ChatRequestsComponent implements OnInit {

  @Input() readonly chatRequests: ChatRequests[];
  @Input() readonly crDisplayed: boolean;
  @Output() public selectedChat: EventEmitter<ChatRequests> = new EventEmitter<ChatRequests>();
  @Output() public resized: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private chatService: ChatService) {
  }

  joinRoom(cr: ChatRequests) {
    const chatRequest: ChatRequests = cr;
    this.chatService.fulfill(cr);
    this.selectedChat.emit(chatRequest);
    this.chatRequests.map(c => {
      if (c._id === cr._id) {
        this.chatRequests.splice(this.chatRequests.indexOf(c), 1);
        this.resized.emit(true);
      }
    });
  }

  ngOnInit() {
  }

}
