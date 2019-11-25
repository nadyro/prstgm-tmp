import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {AdminService} from './services/admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {

  constructor(public adminService: AdminService) {

  }

  games;
  message;
  formGroup;
  gameCategories;

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

  addTag(name) {
    this.searchGames();
    console.log(name);
    // const adminRes = this.adminService.addGame(name).toPromise();
    // adminRes.then((res) => {
    //   if (res['status'] === 202) {
    //     this.message = res['message'];
    //   } else if (res['status'] === 200) {
    //     this.message = res['message'];
    //   }
    // });
  }

  addTagPromise = (addTag) => this.addTag(addTag);

  onSubmit() {
    this.adminService.addGame(this.formGroup).subscribe(res => {
      console.log(res);
    });
  }

  compareElementsFn(item, selection) {
    if (selection._id && item._id) {
      return selection._id === item._id;
    }
    if (selection.title && item.title) {
      return selection.title === item.title;
    }
    return false;
  }

  compareElements = (item, selection) => this.compareElementsFn(item, selection);

  ngOnInit() {
    this.formGroup = new FormGroup({
      gameSelection: new FormControl('', Validators.required),
      gameCategorySelection: new FormControl('', Validators.required)
    });
    this.searchGames();
  }

}
