import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from '../../../environments/environment';

(window as any).global = window;

@Injectable()
export class LeagueSummonerService {
  apiUrl = environment.apiUrl;
  prostagmaApiUrl = `${this.apiUrl}/api/prostagmaApi`;

  constructor(private http: HttpClient) {

  }

  leagueSummonerByName(sn): Observable<any> {
    const obj = {summonerName: sn};
    return (this.http.post(this.prostagmaApiUrl + '/profile/getSummoner', obj).pipe(map(res => {
      console.log(res);
      return (res);
    })));
  }
}
