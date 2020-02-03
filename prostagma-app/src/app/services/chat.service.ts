import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Users} from '../models/users';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private httpClient: HttpClient) {
  }

  apiUrl = 'http://localhost:3001';
  prostagmaApiUrl = `${this.apiUrl}/api/prostagmaApi`;

  public getUsers(): Observable<Users[]> {
    return this.httpClient.get<Users[]>(this.prostagmaApiUrl + '/db/getUsers').pipe(map(users => {
      console.log('here');

      return users;
    }));
  }
}
