import { Component, OnInit } from '@angular/core';
import {ChatService} from "../services/chat.service";
import {Observable} from "rxjs";
import {Users} from "../../../../models/Users";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  users$: Observable<Users[]>;

  constructor(private chatService: ChatService) {
    this.users$ = this.chatService.getUsers().pipe(map(users => users));
    this.chatService.getUsers().subscribe(users => {
      users.forEach(user => {
        console.log(user.username);
      });
    });
  }

  ngOnInit() {
  }

}
