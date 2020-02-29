import {Injectable} from '@angular/core';
import * as auth0 from 'auth0-js';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {Users} from '../../../../models/Users';
import {AuthResults} from '../../../../models/AuthResults';

(window as any).global = window;

@Injectable()
export class AuthService {
  auth0 = new auth0.WebAuth({
    clientID: 'uF6bx7ipLoeTyS4jg1GFiMEZjAA4nVcA',
    domain: environment.auth.domain,
    responseType: 'token',
    redirectUri: environment.auth.auth0RedirectUri,
    audience: 'http://prostagma.fr',
    scope: 'openid profile email'
  });

  expiresAt: number;
  isAdminBool: number;
  userProfile: Users = new Users();
  accessToken: string;
  authenticated: boolean;

  constructor(private http: HttpClient, private router: Router) {
    this.getAccessToken();
  }

  private apiUrl = environment.apiUrl;
  private prostagmaApiUrl = `${this.apiUrl}/api/prostagmaApi`;

  private _setSession(authResult: AuthResults<Users>) {
    this.expiresAt = authResult.credentials.expiresIn * 1000 + Date.now();
    this.accessToken = authResult.credentials.accessToken;
    this.userProfile = authResult.object;
    this.isAdminBool = authResult.object.isAdminBool;
    this.authenticated = true;
  }

  getUserInfos(authResult: AuthResults<Users>) {
    this.auth0.client.userInfo(authResult.credentials.accessToken, (err, profile) => {
      if (profile) {
        this._setSession(authResult);
      }
    });
  }

  getAccessToken() {
    this.auth0.checkSession({}, (err, authResult: AuthResults<Users>) => {
      if (authResult && authResult.credentials.accessToken) {
        this.getUserInfos(authResult);
      }
    });
  }

  handleLoginCallback() {
    console.log('test');
    this.auth0.parseHash((err, authResult: AuthResults<Users>) => {
      if (authResult && authResult.credentials.accessToken) {
        window.location.hash = '';
        this.getUserInfos(authResult);
      } else if (err) {
        console.error(`Error ${err.error}}`);
      }
      this.router.navigate(['/']).then((callback) => {
        console.log(callback);
      });
    });
  }

  logout() {
    this.auth0.logout({
      returnTo: environment.auth.auth0ReturnTo,
      clientID: environment.auth.clientID
    });
  }

  get isLoggedIn(): boolean {
    return Date.now() < this.expiresAt && this.authenticated;

  }

  get isAdmin(): boolean {
    return !!this.isAdminBool;
  }

  team() {
    return (this.http.get(this.prostagmaApiUrl + '/teams', {
        headers: new HttpHeaders().set('Authorization', `Bearer ${this.accessToken}`)
      }).pipe(map(res => {
        console.log(res);
      }))
    );
  }

  saveUser(formGroup): Observable<AuthResults<Users>> {
    return (this.http.post<AuthResults<Users>>(this.prostagmaApiUrl + '/db/saveUser', formGroup).pipe(map(res => {
      if (!res.success) {
        return res;
      }
      this._setSession(res);
      this.router.navigate(['/chat']).then((callback) => {
        console.log('Navigated to : ' + callback);
      });
      return res;
    })));
  }

  log(formGroup): Observable<AuthResults<Users>> {
    return (this.http.post<AuthResults<Users>>(this.prostagmaApiUrl + '/db/connect', formGroup).pipe(map(res => {
      console.log(res);
      if (res.success === false) {
        return res;
      }
      this._setSession(res);
      this.router.navigate(['/chat']).then((callback) => {
        console.log('Navigated to : ' + callback);
      });
      return (res);
    })));
  }
}
