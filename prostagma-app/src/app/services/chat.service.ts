import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Users} from '../../../../models/Users';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Message} from '../../../../models/Message';
import * as io from 'socket.io-client';
import {AuthService} from './auth.service';
import {ChatRequests} from '../../../../models/ChatRequests';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private socket;
  readonly apiUrl: string;
  readonly prostagmaApiUrl: string;
  private dataObservable: Observable<Message>;
  public connectionStatus: Observable<string>;
  public chatRequest: Observable<ChatRequests> = new Observable<ChatRequests>();
  public isFulfilled: Observable<ChatRequests> = new Observable<ChatRequests>();
  public welcome: Observable<any> = new Observable<any>();
  public emitStatusMessage: EventEmitter<string> = new EventEmitter<string>();

  constructor(private httpClient: HttpClient, private authService: AuthService) {
    this.apiUrl = 'http://prostagma.fr';
    this.prostagmaApiUrl = `${this.apiUrl}/api/prostagmaApi`;
    if (this.socket) {
      this.socket.disconnect();
    }
    this.socket = io.connect('http://prostagma.fr/chat');
    this.socketMessageManager('roomCreated').then(s1 => {
      if (this.authService.userProfile._id === s1.requester._id) {
        setTimeout(() => {
          this.emitStatusMessage.emit('Creating room...');
        }, 2000);
      }
    });
    this.socketMessageManager('waitingRecipient').then(s2 => {
      if (this.authService.userProfile._id === s2.requester._id) {
        setTimeout(() => {
          this.emitStatusMessage.emit('Waiting for ' + s2.recipient.username + ' to join the room : ' + s2.roomId);
        }, 3000);
      }
    });
    this.socketMessageManager('welcome').then(s3 => {
      if (this.authService.userProfile._id === s3.requester._id) {
        this.emitStatusMessage.emit('Welcome ' + s3.recipient.username + ' !');
      }
    });
  }

  callbackSocket(data): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      console.log(data);
    });
  }

  public socketMessageManager(event): Promise<any> {
    return new Promise<any>(ev => {
      this.socket.on(event, (data) => {
        console.log(data);
        return ev(data);
      });
    });
  }

  /**  Initializes a chat between the requester and the recipient */
  public initChat(usersId): Observable<string> {
    this.socket.emit('requestConnection', usersId);
    return this.statusMessage('initChat');
  }

  public statusMessage(statusMessage: string): Observable<string> {
    return new Observable<string>(status => {
      this.socket.on(statusMessage, (sm) => {
        console.log(sm);
        status.next(sm.statusMessage);
        return this.statusMessage(sm.nextStatusMessage);
      });
    });
  }

  public checkFulfilled(): Observable<ChatRequests> {
    return this.isFulfilled = new Observable<ChatRequests>(chatRequest => {
      this.socket.on('fulfill', (cr: ChatRequests) => {
        // if (this.authService.userProfile._id === cr.requester._id) {
        //   this.emitStatusMessage.emit('Waiting for ' + cr.recipient.username + ' to join the room');
        // }
        chatRequest.next(cr);
      });
    });
  }

  public fulfill(chatRequest: ChatRequests) {
    chatRequest.fulfilled = true;
    const objAuth = {
      cr: chatRequest,
      recipient: this.authService.userProfile
    };
    this.socket.emit('fulfilled', objAuth);
  }

  public welcomeMessage(): Observable<string> {
    return this.welcome = new Observable<any>(wlcm => {
      this.socket.on('welcome', (welcome: ChatRequests) => {
        const welcomeMessage = 'Bienvenue ' + welcome.recipient.username + ' et ' + welcome.requester.username + '.';
        wlcm.next(welcomeMessage);
      });
    });
  }


  public getChatRequests(): Observable<ChatRequests> {
    return this.chatRequest = new Observable<ChatRequests>(chatRequest => {
      this.socket.on('fulfill', (cr: ChatRequests) => {
        if (cr.recipient._id === this.authService.userProfile._id) {
          chatRequest.next(cr);
        }
      });
    });
  }

  public getData(directive: string): Observable<Message> {
    return this.dataObservable = new Observable<Message>(message => {
      this.socket.on(directive, (simpleMessage) => message.next(simpleMessage));
    });
  }

  public sendMessage(message: string): void {
    const newMessage = new Message();
    newMessage.content = message;
    newMessage.receptionDate = new Date();
    this.socket.emit('simpleMessage', newMessage);
  }
}
