import {Component, OnInit} from '@angular/core';
import {HomeService} from '../games/services/home.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {Categories} from '../../../../models/Categories';
import {map} from 'rxjs/operators';
import * as io from 'socket.io-client';
import {ChatService} from '../services/chat.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  private formGroup: FormGroup;
  private loading: boolean;
  private message: string;
  private socket;
  public categories$: Observable<Categories[]>;

  constructor(private homeService: HomeService, private chatService: ChatService) {
  }

  customSearchFn(term: string, item: any) {
    term = term.toLowerCase();
    return item.categoryName.toLowerCase().indexOf(term) > -1;
  }

  deleteCategory(id) {
    this.categories$ = this.homeService.deleteCategory(id).pipe(map(categories => {
      this.chatService.sendData(categories);
      return categories;
    }));
  }

  onSubmit() {
    this.loading = true;
    let categoryList: Categories[] = new Array<Categories>();
    this.homeService.getCategories().subscribe(categories => {
      categoryList = categories;
      console.log(this.formGroup);
      let categoryFound;
      this.formGroup.value.selection.forEach(elt => {
        if (elt._id) {
          categoryFound = categoryList.find(category => category._id === elt._id);
        }
        console.log(categoryFound);
      });
      if (categoryFound === undefined) {
        console.log('here');
        this.categories$ = this.homeService.addCategories(this.formGroup)
          .pipe(map((categoriesAdded) => {
            this.chatService.sendData(categoriesAdded);
            return categoriesAdded;
          }));
        this.loading = false;
      } else {
        this.message = 'Category already exists in our database';
        this.loading = false;
      }
    });
  }

  ngOnInit() {
    this.chatService.getData('msgReceived').subscribe(message => console.log(message));
    this.chatService.getData('simpleMessage').subscribe(message => console.log(message.content));
    this.categories$ = this.homeService.getCategories().pipe(map(categories => {
      console.log(categories);
      return categories;
    }));
    this.formGroup = new FormGroup({
      selection: new FormControl('', Validators.required)
    });
  }

}
