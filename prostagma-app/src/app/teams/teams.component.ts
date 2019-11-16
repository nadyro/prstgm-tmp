import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { GamesService } from '../services/games.service';
import { TeamsService } from '../services/teams.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss']
})
export class TeamsComponent implements OnInit {

  constructor(private authService : AuthService, private teamsService: TeamsService, private gamesService: GamesService) { }

  purposeList = new Array;
  createTeamForm = new FormGroup({
    teamName: new FormControl('', Validators.required),
    purpose: new FormControl('', Validators.required),
  });
  team_name;
  team_purpose;
  users;
  games;
  get purpose() {
    return this.createTeamForm.get('purpose');
  }
  get teamName() {
    return this.createTeamForm.get('teamName');
  }
  display_list(element_id){
    console.log(element_id);
    element_id.style.height = '50px';
  }
  getGames(){
    this.gamesService.getGames().subscribe(res => {
      this.games = res['games'];
    });
  }
  selectPurposes(purposeSelector){
    console.log(purposeSelector);
    purposeSelector.nextSibling.style.display = "block"
  }
  selectPurpose(purpose){
    this.createTeamForm.get('purpose').setValue(purpose.id);
    console.log(this.createTeamForm.get('purpose').value);
  }
  onSubmit(value) {
    console.log(value);
    var users = this.teamsService.getUsers();
    users.subscribe(res => {
      this.users = res['users'];
    })
    this.team_name = this.createTeamForm.value.teamName;
    this.team_purpose = this.createTeamForm.value.purpose;
    this.getGames();
  }
  ngOnInit() {
    this.purposeList[0] = "Competition";
    this.purposeList[1] = "Fun";
    this.purposeList[2] = "IRL & Fun";
    this.purposeList[3] = "IRL & Competition";
    this.purposeList[4] = "BFF";
    this.authService.team().subscribe(res=> {
      console.log(res);
    })
  }

}
