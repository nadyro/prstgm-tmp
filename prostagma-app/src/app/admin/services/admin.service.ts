import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';
import { environment } from '../../../environments/environment';

@Injectable()
export class AdminService {
    constructor(private http: HttpClient){
    }
    api_url = "http://localhost:3001";
    prostagma_api_url = `${this.api_url}/api/prostagmaApi`;
    addGame(game){
        console.log(game);
        var obj = {game_name: game};
        return this.http.post(this.prostagma_api_url + '/db/admin/addGame', obj).pipe(map(res => {
            console.log(res);
            return (res);
        }))
    }
    searchGamesInDb(researchValue){
        var obj = {research : researchValue}; 
        return this.http.post(this.prostagma_api_url + '/db/admin/getGames', obj).pipe(map(res => {
            return (res);
        }))
    }
    deleteGameInDb(game_id){
        var obj = {game_id: game_id};
        console.log('Test');
        return (this.http.delete(this.prostagma_api_url + '/db/admin/deleteGame/' + game_id).pipe(map(res => {
            console.log(res);
            return (res);
        })));
    }
}