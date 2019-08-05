import { Injectable } from '@angular/core';
import * as auth0 from 'auth0-js';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';
import { environment } from '../../environments/environment';

(window as any).global = window;
@Injectable()
export class AuthService {
    auth0 = new auth0.WebAuth({
        clientID: 'uF6bx7ipLoeTyS4jg1GFiMEZjAA4nVcA',
        domain: environment.auth.domain,
        responseType: 'token',
        redirectUri: environment.auth.auth0RedirectUri,
        audience: 'http://localhost:3001',
        scope: 'openid profile email'
    });
    expiresAt: Number;
    userProfile: any;
    accessToken: string;
    authenticated: boolean;

    constructor(private http: HttpClient, private router: Router) {
        this.getAccessToken();
    }
    api_url = "http://localhost:3001";
    prostagma_api_url = `${this.api_url}/api/prostagmaApi`;

    private handleError(err: HttpErrorResponse | any) {
        console.error('An error occurred', err);
        return throwError(err.message || err);
    }

    private _setSession(authResult, profile) {
        this.expiresAt = authResult.expiresIn * 1000 + Date.now();
        this.accessToken = authResult.accessToken;
        this.userProfile = profile;
        this.authenticated = true;
    }

    getUserInfos(authResult) {
        this.auth0.client.userInfo(authResult.accessToken, (err, profile) => {
            if (profile) {
                console.log(profile)
                this._setSession(authResult, profile);
            }
        })
    }

    getAccessToken() {
        this.auth0.checkSession({}, (err, authResult) => {
            if (authResult && authResult.accessToken) {
                this.getUserInfos(authResult);
            }
        })
    }

    handleLoginCallback(){
        console.log("test");
        this.auth0.parseHash((err, authResult) => {
            if (authResult && authResult.accessToken) {
                window.location.hash = '';
                this.getUserInfos(authResult);
            } else if (err) {
                console.error(`Error ${err.error}}`)
            }
            this.router.navigate(['/']);
        });
    }

    login() {
        console.log(this.auth0);
        this.auth0.authorize();
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
    team() {
        return (this.http.get(this.prostagma_api_url + '/teams', {
            headers: new HttpHeaders().set('Authorization', `Bearer ${this.accessToken}`)
        }).pipe(map(res => {
            console.log(res);
        }))
        )
    }
    connect(): Observable<any> {
        console.log("Auth service landed");
        console.log(this.prostagma_api_url);
        return (this.http.get(this.prostagma_api_url + '/connect').pipe(map(res => {
            console.log(res);
        })
        ))
    }
    saveUser(formGroup): Observable<any> {
        console.log(formGroup);
        return (this.http.post(this.prostagma_api_url + '/db/saveUser', formGroup).pipe(map(res => {
            console.log(res);
        })));
    }
    subscribe(formGroup): Observable<any> {
        console.log(formGroup);
        return (this.http.post(this.prostagma_api_url + '/subscribe', formGroup).pipe(map(res => {
            console.log(res);
        })))
    }
    log(formGroup): Observable<any> {
        console.log(formGroup);
        return (this.http.get(this.prostagma_api_url + '/db/connect').pipe(map(res => {
            console.log(res);
        })))
    }
}