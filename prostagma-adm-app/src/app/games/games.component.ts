import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {HomeService} from './services/home.service';
import {Subject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Games} from '../../../../models/Games';
import {Categories} from '../../../../models/Categories';
import {CategoriesComponent} from '../categories/categories.component';
import {ChatService} from '../services/chat.service';

enum gamesSelection {
  boundLabel = 'title',
  boundValue = '',
  groupBy = 'categoryName',
}

@Component({
  selector: 'app-admin',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss'],
  providers: [CategoriesComponent]
})
export class GamesComponent implements OnInit {

  obsDeletion: Subject<Games[]> = new Subject<Games[]>();
  private games$: Observable<Games[]>;
  private loading = false;
  private categories$: Observable<Categories[]>;
  private categoriesArray: Categories[];
  private formGroup: FormGroup;
  private message: string;
  constructor(public adminService: HomeService, private categories: CategoriesComponent, private chatService: ChatService) {
    this.categories$ = categories.categories$;
    // this.chatService.getData('msgReceived').subscribe(games => {
    //   this.games$ = games.pipe(map(gamess => gamess));
    // });
  }
  searchGames() {
    this.games$ = this.adminService.searchGamesInDb().pipe(map(games => {
      return games;
    }));
  }

  deleteGame(gameId) {
    this.games$ = this.adminService.deleteGameInDb(gameId).pipe(map(games => games));
  }

  groupValue(content, arrayValue) {
    return ({categoryName: content, total: arrayValue.length});
  }

  groupByFn = (item) => item[gamesSelection.groupBy];
  groupValueFn = (_: string, children: any[]) => this.groupValue(_, children);

  onSubmit() {
    this.loading = true;
    let gamesList: Games[] = new Array<Games>();
    this.adminService.searchGamesInDb().subscribe(games => {
      gamesList = games;
      let gameFound;
      this.formGroup.value.selection.forEach(elt => {
        gameFound = gamesList.find(game => game._id === elt._id);
      });
      if (gameFound === undefined) {
        this.games$ = this.adminService.addGame(this.formGroup).pipe(map(gamesReturned => gamesReturned));
        this.loading = false;
      } else {
        this.message = 'Game already exists in our database';
        this.loading = false;
      }
    });
    // TODO Add a feature to display added games and already existing ones in the view.
    // this.adminService.addGame(this.formGroup).subscribe(res => {
    //   this.searchGames();
    //   this.loading = false;
    // });
  }

  customSearchFn(term: string, item: any) {
    term = term.toLowerCase();
    return item.title.toLowerCase().indexOf(term) > -1 || item.categoryName.toLowerCase() === term;
  }

  ngOnInit() {
    this.chatService.getData('categories').subscribe(categories => {
      this.categoriesArray = categories;
    });
    this.games$ = this.adminService.searchGamesInDb().pipe(map(games => games));
    this.adminService.getCategories().subscribe(categories => {
      this.categoriesArray = categories;
    });
    this.formGroup = new FormGroup({
      selection: new FormControl('', Validators.required),
      categorySelection: new FormControl('', Validators.required)
    });
  }

}
