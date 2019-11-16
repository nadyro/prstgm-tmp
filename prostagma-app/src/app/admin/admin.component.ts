import { Component, OnInit } from '@angular/core';
import { AdminService } from './services/admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(private adminService: AdminService) { }

  games;
  message;
  add_game(add_game_button) {
    var game_name = add_game_button.previousSibling.previousSibling.value;
    this.adminService.addGame(game_name).subscribe(res => {
      if (res['status'] == 202)
        this.message = res['message'];
      else if (res['status'] == 200)
        this.message = res['message'];
    })
  }
  search_games(value) {
    this.message = "";
    this.adminService.searchGamesInDb(value.value).subscribe(res => {
      if (res['games'])
        this.games = res['games'];
      else
        this.games = [];
    });
  }

  delete_game(game, game_id) {
    var tab_length = this.games.length;
    var i = 0;
    while (i < tab_length) {
      if (this.games[i]._id === game_id) {
        this.games.splice(i, 1);
        i = 0;
        break;
      }
      i++;
    }
    this.adminService.deleteGameInDb(game_id).subscribe(res => {
      console.log(res);
    })
  }

  ngOnInit() {
  }

}
