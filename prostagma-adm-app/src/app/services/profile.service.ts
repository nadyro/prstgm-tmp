import { Injectable } from '@angular/core';
import * as auth0 from 'auth0-js';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';
import { environment } from '../../environments/environment';

@Injectable()
export class ProfileService {
    constructor(private http: HttpClient){

    }
    api_url = "http://localhost:3001";
    prostagma_api_url = `${this.api_url}/api/prostagmaApi`;

    getUser(userCredentials):Observable<any>{
        var obj = {email: userCredentials}
        console.log(userCredentials);
        return (this.http.post(this.prostagma_api_url + '/db/getUserByEmail', obj).pipe(map(res => {
            console.log(res);
            return res;
        })));
    }
}