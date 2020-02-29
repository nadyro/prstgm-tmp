import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Users} from '../../../../models/Users';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {AuthService} from './auth.service';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  readonly apiUrl: string;
  readonly prostagmaApiUrl: string;

  constructor(private httpClient: HttpClient, private authService: AuthService) {
    this.apiUrl = environment.apiUrl;
    this.prostagmaApiUrl = `${this.apiUrl}/api/prostagmaApi`;
  }

  public getUsersExceptCurrent(): Observable<Users[]> {
    return this.httpClient.get<Users[]>(this.prostagmaApiUrl + '/db/getUsers').pipe(map(users => {
      users.map(u => {
        if (u._id === this.authService.userProfile._id) {
          users.splice(users.indexOf(u), 1);
          return users;
        }
      });
      return users;
    }));
  }
}
