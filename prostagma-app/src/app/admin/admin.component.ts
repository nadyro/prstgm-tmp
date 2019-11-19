import {Component, OnInit} from '@angular/core';
import {AdminService} from './services/admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(private adminService: AdminService) {
  }

  games;
  message;

  addGame(addGameButton) {
    console.log(addGameButton);
    this.adminService.addGame(addGameButton.searchTerm).subscribe(res => {
      if (res['status'] === 202) {
        this.message = res['message'];
      } else if (res['status'] === 200) {
        this.message = res['message'];
        this.searchGames();
      }
    });
  }

  searchGames() {
    this.adminService.searchGamesInDb().subscribe(res => {
      if (res['games']) {
        this.games = res['games'];
      }
    });
  }

  deleteGame(game, gameId) {
    const tabLength = this.games.length;
    let i = 0;
    while (i < tabLength) {
      if (this.games[i]._id === gameId) {
        this.games.splice(i, 1);
        i = 0;
        break;
      }
      i++;
    }
    this.adminService.deleteGameInDb(gameId).subscribe(res => {
      console.log(res);
    });
  }

  ngOnInit() {
    this.searchGames();
  }

}
