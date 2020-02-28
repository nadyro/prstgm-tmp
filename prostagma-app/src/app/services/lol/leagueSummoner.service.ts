import { Injectable } from '@angular/core';
import * as auth0 from 'auth0-js';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';
import { environment } from '../../../environments/environment';

(window as any).global = window;
@Injectable()
export class LeagueSummonerService {
  api_url = "http://prostagma.fr";
    prostagma_api_url = `${this.api_url}/api/prostagmaApi`;

    constructor(private http: HttpClient){

    }

    leagueSummonerByName(summonerName):Observable<any> {
        var obj = {summonerName : summonerName};
        return (this.http.post(this.prostagma_api_url + '/profile/getSummoner', obj).pipe(map(res => {
            console.log(res);
            return (res);
        })));
    }
}
