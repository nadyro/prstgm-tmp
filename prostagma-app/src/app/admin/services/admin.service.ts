import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {FormGroup} from '@angular/forms';
import {Observable, of} from "rxjs";

@Injectable()
export class AdminService {
  constructor(private http: HttpClient) {
  }

  apiUrl = 'http://localhost:3001';
  prostagmaApiUrl = `${this.apiUrl}/api/prostagmaApi`;

  addGame(gameForm: FormGroup) {
    const obj = {gamesForm: gameForm.value};
    console.log(obj);
    return this.http.post(this.prostagmaApiUrl + '/db/admin/addGame', obj).pipe(map(res => {
      console.log(res);
      return (res);
    }));
  }

  getCategories() {
    return this.http.get(this.prostagmaApiUrl + '/db/admin/getCategories').pipe(map(res => {
      return res;
    }));
  }

  searchGamesInDb(id?: string, games?: Observable<any[]>): Observable<any[]> {
    if (id) {
      return this.http.get<any[]>(this.prostagmaApiUrl + '/db/admin/getGames?id=' + id).pipe(map(res => {
        console.log(res);
        return res;
      }));
    } else {
      return this.http.get<any[]>(this.prostagmaApiUrl + '/db/admin/getGames').pipe(map(res => {
        return (res);
      }));
    }
  }

  deleteGameInDb(gameId) {
    console.log('Test');
    return (this.http.delete(this.prostagmaApiUrl + '/db/admin/deleteGame/' + gameId).pipe(map(res => {
      console.log(res);
      return (res);
    })));
  }
}
