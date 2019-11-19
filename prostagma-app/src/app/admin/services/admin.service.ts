import {Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import {throwError, Observable} from 'rxjs';
import {map, catchError} from 'rxjs/operators';
import {FormGroup} from '@angular/forms';
import {environment} from '../../../environments/environment';

@Injectable()
export class AdminService {
  constructor(private http: HttpClient) {
  }

  apiUrl = 'http://localhost:3001';
  prostagmaApiUrl = `${this.apiUrl}/api/prostagmaApi`;

  addGame(game) {
    console.log(game);
    const obj = {game_name: game};
    return this.http.post(this.prostagmaApiUrl + '/db/admin/addGame', obj).pipe(map(res => {
      console.log(res);
      return (res);
    }));
  }

  searchGamesInDb() {
    return this.http.get(this.prostagmaApiUrl + '/db/admin/getGames').pipe(map(res => {
      return (res);
    }));
  }

  deleteGameInDb(gameId) {
    console.log('Test');
    return (this.http.delete(this.prostagmaApiUrl + '/db/admin/deleteGame/' + gameId).pipe(map(res => {
      console.log(res);
      return (res);
    })));
  }
}
