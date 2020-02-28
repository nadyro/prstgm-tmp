import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {GamesComponent} from './games/games.component';
import {HomeService} from './games/services/home.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {NgSelectModule} from '@ng-select/ng-select';
import {HeaderComponent} from './header/header.component';
import {AuthService} from './services/auth.service';
import {ProfileComponent} from './profile/profile.component';
import {CategoriesComponent} from './categories/categories.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

const config: SocketIoConfig = {url: 'http://localhost:8081', options: {}};
@NgModule({
  declarations: [
    AppComponent,
    GamesComponent,
    HeaderComponent,
    ProfileComponent,
    CategoriesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgSelectModule,
    SocketIoModule.forRoot(config),
  ],
  providers: [HomeService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
