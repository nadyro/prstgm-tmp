import {Component, EventEmitter, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {AdminService} from './services/admin.service';
import {Subject, of, concat, Observable, ObservableInput, BehaviorSubject} from 'rxjs';
import {catchError, distinctUntilChanged, map, switchMap, tap} from 'rxjs/operators';
import {NgSelectComponent} from '@ng-select/ng-select';
import {Games} from "../models/Games";
import {Categories} from "../models/Categories";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {

  constructor(public adminService: AdminService) {

  }

  private games$: Observable<Games[]>;
  private categories$: Observable<Categories[]>;
  message = 'Ceci est un test';
  formGroup;
  gameCategories;
  loading = false;
  cat = 'categoryName';
  gamesInput = new EventEmitter<string>();

  // addGame(addGameButton) {
  //   console.log(addGameButton);
  //   this.adminService.addGame(addGameButton.searchTerm).subscribe(res => {
  //     if (res['status'] === 2 02) {
  //       this.message = res['message' ];
  //     } else if (res['status'] === 200) {
  //       this.message = res['message'];
  //       this.searchGames();
  //     }
  //   });
  // }
  added(event) {
    console.log(event);
  }

  blurred(event) {
    console.log(event);
  }

  changed(event) {
    console.log(event);
  }

  searched(event) {
    console.log(event);
  }

  removed(event) {
    console.log(event);
    event.open();
  }

  openSelect(select: NgSelectComponent) {
    select.open();
  }
  searchGames() {
    this.games$ = this.adminService.searchGamesInDb().pipe(map(games => {
      return games;
    }));
  }

  returnSearchGames(): any {
    return this.adminService.searchGamesInDb().subscribe(res => {
      if (res['games']) {
        return res['games'];
      }
      return [];
    });
  }

  // deleteGame(game, gameId) {
  //   const tabLength = this.games$.length;
  //   let i = 0;
  //   while (i < tabLength) {
  //     if (this.games$[i]._id === gameId) {
  //       this.games$.splice(i, 1);
  //       i = 0;
  //       break;
  //     }
  //     i++;
  //   }
  //   this.adminService.deleteGameInDb(gameId).subscribe(res => {
  //     console.log(res);
  //   });
  // }

  labelBind(item): string {
    return item.indexOf(item.title);
  }

  addTag() {
    console.log(this.adminService);
    // this.loading = true;
    // const adminRes = this.adminService.addGame(name).toPromise();
    // adminRes.then((res) => {
    //   if (res['status'] === 202) {
    //     this.message = res['message'];
    //   } else if (res['status'] === 200) {
    //     this.message = res['message'];
    //   }
    //   this.loading = false;
    // });
  }

  addTagPromise = (addTag) => this.addTag();

  groupValue(content, arrayValue) {
    return ({categoryName: content, total: arrayValue.length});
  }

  groupByFn = (item) => item[this.cat];
  groupValueFn = (_: string, children: any[]) => this.groupValue(_, children);

  onSubmit() {
    this.loading = true;
    // TODO Add a feature to display added games and already existing ones in the view.
    this.adminService.addGame(this.formGroup).subscribe(res => {
      this.searchGames();
      this.loading = false;
    });
  }

  // compareElementsFn(item, selection) {
  //   if (selection._id && item._id) {
  //     return selection._id === item._id;
  //   }
  //   if (selection.title && item.title) {
  //     return selection.title === item.title;
  //   }
  //   return false;
  // }

  // compareElements = (item, selection) => this.compareElementsFn(item, selection);

  customSearchFn(term: string, item: any) {
    console.log(item);
    console.log(term);
    term = term.toLowerCase();
    return item.title.toLowerCase().indexOf(term) > -1 || item.categoryName.toLowerCase() === term;
  }

  trackFn(item) {
    return item._id;
  }

  ngOnInit() {
    this.games$ = this.adminService.searchGamesInDb().pipe(map(games => {
      console.log(games);
      return games;
    }));
    this.categories$ = this.adminService.getCategories().pipe(map(categories => categories));
    //
    // this.adminService.getCategories().subscribe((res) => {
    //   this.gameCategories = res['categories'];
    // });
    this.formGroup = new FormGroup({
      selection: new FormControl('', Validators.required),
      categorySelection: new FormControl('', Validators.required)
    });
    // console.log(this.formGroup.get('gameSelection'));
  }

}
