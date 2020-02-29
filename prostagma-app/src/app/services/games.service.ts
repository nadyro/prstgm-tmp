import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {environment} from '../../environments/environment';

@Injectable()
export class GamesService {
  constructor(private http: HttpClient) {
  }

  apiUrl = environment.apiUrl;
  prostagmaApiUrl = `${this.apiUrl}/api/prostagmaApi`;

  getGames() {
    return (this.http.get(this.prostagmaApiUrl + '/db/getGames').pipe(map(res => {
      console.log(res);
      return (res);
    })));
  }
}
