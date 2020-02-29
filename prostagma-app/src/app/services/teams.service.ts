import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {environment} from '../../environments/environment';

@Injectable()
export class TeamsService {
  constructor(private http: HttpClient) {

  }

  private apiUrl = environment.apiUrl;
  private prostagmaApiUrl = `${this.apiUrl}/api/prostagmaApi`;

  getUsers() {
    return (this.http.get(this.prostagmaApiUrl + '/db/getUsers').pipe(map(res => {
      console.log(res);
      return (res);
    })));
  }
}
