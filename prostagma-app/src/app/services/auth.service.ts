import {Injectable} from '@angular/core';
import * as auth0 from 'auth0-js';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from '../../environments/environment.prod';
import {Users} from '../../../../models/Users';

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

  apiUrl = 'http://prostagma.fr';
  prostagmaApiUrl = `${this.apiUrl}/api/prostagmaApi`;

  private _setSession(authResult, profile) {
    console.log(authResult);
    this.expiresAt = authResult.authResults.expiresIn * 1000 + Date.now();
    this.accessToken = authResult.accessToken;
    this.userProfile = profile;
    this.authenticated = true;
    this.isAdminBool = profile.isAdminBool;
  }

  getUserInfos(authResult) {
    this.auth0.client.userInfo(authResult.accessToken, (err, profile) => {
      if (profile) {
        this._setSession(authResult, profile);
      }
    });
  }

  getAccessToken() {
    this.auth0.checkSession({}, (err, authResult) => {
      if (authResult && authResult.accessToken) {
        this.getUserInfos(authResult);
      }
    });
  }

  handleLoginCallback() {
    console.log('test');
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken) {
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
    if (this.isAdminBool) {
      return true;
    } else {
      return false;
    }
  }

  team() {
    return (this.http.get(this.prostagmaApiUrl + '/teams', {
        headers: new HttpHeaders().set('Authorization', `Bearer ${this.accessToken}`)
      }).pipe(map(res => {
        console.log(res);
      }))
    );
  }

  saveUser(formGroup): Observable<any> {
    return (this.http.post(this.prostagmaApiUrl + '/db/saveUser', formGroup).pipe(map(res => {
      this.router.navigate(['/auth_login']).then((callback) => {
        console.log('Navigated to : ' + callback);
      });
      return res;
    })));
  }

  log(formGroup): Observable<any> {
    return (this.http.post(this.prostagmaApiUrl + '/db/connect', formGroup).pipe(map(res => {
      this._setSession(res, res['authResults'].user);
      this.router.navigate(['/chat']).then((callback) => {
        console.log('Navigated to : ' + callback);
      });
      return (res);
    })));
  }
}
