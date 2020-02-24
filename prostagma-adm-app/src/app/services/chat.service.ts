import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators';
import * as io from 'socket.io-client';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Message} from '../../../../models/Message';
import {Categories} from '../../../../models/Categories';
@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private socket;
  private dataObservable: Observable<Message>;
  constructor(private http: HttpClient) {
    const options =  {transports: ['websocket']};
    this.socket = io.connect('http://localhost:3001');
    this.socket.on('init', (data) => {
      console.log(data);
    });
  }

  public getData(directive: string) {
    return this.dataObservable = new Observable<any>(message => {
      this.socket.on(directive, (simpleMessage) => message.next(simpleMessage));
    });
  }
  public sendData(objs: Categories[]): void {
    let categories: Categories[];
    categories = objs;
    this.socket.emit('simpleMessage', categories);
  }
  public sendMessage(message: string): void {
    const newMessage = new Message();
    newMessage.content = message;
    newMessage.receptionDate = new Date();
    this.socket.emit('simpleMessage', newMessage);
  }
}
