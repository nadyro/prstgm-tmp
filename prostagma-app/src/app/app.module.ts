import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgSelectModule, NgSelectConfig} from '@ng-select/ng-select';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
// Components
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AuthComponent} from './auth/auth.component';
import {HeaderComponent} from './header/header.component';
import {CarousselComponent} from './caroussel/caroussel.component';
import {NewsComponent} from './news/news.component';
import {TeamsComponent} from './teams/teams.component';
import {LadderComponent} from './ladder/ladder.component';
import {FindTeamComponent} from './find-team/find-team.component';
import {ChatComponent} from './chat/chat.component';
import {MediaComponent} from './media/media.component';
import {HomeComponent} from './home/home.component';
import {ProfileComponent} from './profile/profile.component';
import {CallbackComponent} from './callback/callback.component';
import {AuthLoginComponent} from './auth-login/auth-login.component';
import {AdminComponent} from './admin/admin.component';

// Services
import {AuthService} from './services/auth.service';
import {ProfileService} from './services/profile.service';
import {TeamsService} from './services/teams.service';
import {GamesService} from './services/games.service';
import {LeagueSummonerService} from './services/lol/leagueSummoner.service';
import {AdminService} from './admin/services/admin.service';
import {ChatRequestsComponent} from './chat-requests/chat-requests.component';
import {NgxSpinnerModule} from 'ngx-spinner';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    HeaderComponent,
    CarousselComponent,
    NewsComponent,
    TeamsComponent,
    LadderComponent,
    FindTeamComponent,
    ChatComponent,
    MediaComponent,
    HomeComponent,
    CallbackComponent,
    AuthLoginComponent,
    ProfileComponent,
    AdminComponent,
    ChatRequestsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgSelectModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
  ],
  providers: [
    AuthService,
    ProfileService,
    LeagueSummonerService,
    TeamsService,
    GamesService,
    NgSelectConfig,
    AdminService
    // {provide: SELECTION_MODEL_FACTORY, useValue: CustomSelectionFactory as SelectionModelFactory }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
