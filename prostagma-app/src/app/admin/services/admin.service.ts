import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {FormGroup} from '@angular/forms';
import {Observable, of} from 'rxjs';
import {Games} from '../../models/Games';
import {Categories} from '../../models/Categories';
import {ResponseReturn} from '../../models/ResponseReturn';

@Injectable()
export class AdminService {
  constructor(private http: HttpClient) {
  }

  apiUrl = 'http://localhost:3001';
  prostagmaApiUrl = `${this.apiUrl}/api/prostagmaApi`;

  addGame(gameForm: FormGroup): Observable<ResponseReturn> {
    const obj = {gamesForm: gameForm.value};
    console.log(obj);
    return this.http.post<ResponseReturn>(this.prostagmaApiUrl + '/db/admin/addGame', obj).pipe(map(res => {
      console.log(res);
      return (res);
    }));
  }

  getCategories(): Observable<Categories[]> {
    return this.http.get<Categories[]>(this.prostagmaApiUrl + '/db/admin/getCategories').pipe(map(categories => {
      return categories;
    }));
  }

  searchGamesInDb(id?: string, games?: Observable<Games[]>): Observable<Games[]> {
    if (id) {
      return this.http.get<Games[]>(this.prostagmaApiUrl + '/db/admin/getGames?id=' + id).pipe(
        map(gamesReturned => {
          console.log(gamesReturned);
          return gamesReturned;
      }));
    } else {
      return this.http.get<Games[]>(this.prostagmaApiUrl + '/db/admin/getGames').pipe(
        map(gamesReturned => {
          return (gamesReturned);
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
