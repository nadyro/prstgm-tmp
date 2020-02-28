import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {FormGroup} from '@angular/forms';
import {Observable} from 'rxjs';
import {Games} from '../../../../../models/Games';
import {Categories} from '../../../../../models/Categories';

@Injectable()
export class HomeService {
  constructor(private http: HttpClient) {
  }

  apiUrl = 'http://localhost:8081';
  prostagmaApiUrl = `${this.apiUrl}/api/prostagmaApi`;

  addGame(gameForm: FormGroup): Observable<Games[]> {
    const obj = {gamesForm: gameForm.value};
    console.log(obj);
    return this.http.post<Games[]>(this.prostagmaApiUrl + '/db/admin/addGame', obj).pipe(map(res => {
      console.log(res);
      return (res);
    }));
  }

  getCategories(): Observable<Categories[]> {
    return this.http.get<Categories[]>(this.prostagmaApiUrl + '/db/admin/getCategories').pipe(map(categories => {
      return categories;
    }));
  }

  addCategories(categoryForm: FormGroup): Observable<Categories[]> {
    const obj = {categoriesForm: categoryForm.value};
    console.log(obj);
    return this.http.post<Categories[]>(this.prostagmaApiUrl + '/db/admin/addCategories', obj)
      .pipe(map(categories => {
        console.log(categories);
        return categories;
      }));
  }
  deleteCategory(categoryId): Observable<Categories[]> {
    if (categoryId) {
      return this.http.delete<Categories[]>(this.prostagmaApiUrl + '/db/admin/deleteCategory/' + categoryId).pipe(
        map(categories => {
          return categories;
        }
      ));
    }
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

  deleteGameInDb(gameId): Observable<Games[]> {
    return (this.http.delete<Games[]>(this.prostagmaApiUrl + '/db/admin/deleteGame/' + gameId).pipe(map(games => {
      return games;
    })));
  }
}
