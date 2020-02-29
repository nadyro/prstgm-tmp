import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from '../../environments/environment';

@Injectable()
export class ProfileService {
  constructor(private http: HttpClient) {

  }

  private apiUrl = environment.apiUrl;
  private prostagmaApiUrl = `${this.apiUrl}/api/prostagmaApi`;

  getUser(userCredentials): Observable<any> {
    const obj = {email: userCredentials};
    console.log(userCredentials);
    return (this.http.post(this.prostagmaApiUrl + '/db/getUserByEmail', obj).pipe(map(res => {
      console.log(res);
      return res;
    })));
  }
}
