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
export class leagueMatchService { 
    api_url = "https://euw1.api.riotgames.com";
    leagueMatchUrl = "/lol/match/v4/matches/";
}