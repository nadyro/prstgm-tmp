import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { AuthLoginComponent } from './auth-login/auth-login.component';
import { HeaderComponent } from './header/header.component';
import { CarousselComponent } from './caroussel/caroussel.component';
import { NewsComponent } from './news/news.component';
import { TeamsComponent } from './teams/teams.component';
import { LadderComponent } from './ladder/ladder.component';
import { FindTeamComponent } from './find-team/find-team.component';
import { ChatComponent } from './chat/chat.component';
import { MediaComponent } from './media/media.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth/auth.guard';
import { CallbackComponent } from './callback/callback.component';

const appRoutes: Routes = [
  { path: 'auth', component: AuthComponent },
  { path: 'auth_login', component: AuthLoginComponent },  
  { path: 'caroussel', component: CarousselComponent },
  { path: 'news', component: NewsComponent },
  { path: 'teams', component: TeamsComponent, canActivate: [AuthGuard] },
  { path: 'ladder', component: LadderComponent, canActivate: [AuthGuard] },
  { path: 'find', component: FindTeamComponent, canActivate: [AuthGuard] },
  { path: 'chat', component: ChatComponent, canActivate: [AuthGuard] },
  { path: 'news', component: NewsComponent, canActivate: [AuthGuard] },  
  { path: 'media', component: MediaComponent },
  { path: 'callback', component: CallbackComponent },
  { path: '', component: HomeComponent },
  { path: '**', component: AppComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(
    appRoutes,
    // { enableTracing: true }
  )],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
