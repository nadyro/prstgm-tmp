import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {ProfileService} from '../services/profile.service';
import {LeagueSummonerService} from '../services/lol/leagueSummoner.service';
import {FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private authService: AuthService, private profileService: ProfileService, private leagueSummonerService: LeagueSummonerService) {
  }

  profileForm = new FormGroup({
    username: new FormControl('',  Validators.required),
    email: new FormControl('', Validators.required),
    old_password: new FormControl('', Validators.pattern(/^(?=.{8,24}$)(?=.*[A-Z]{1,})(?=.*[a-z]{1,})(?=.*\d{1,})(?=.*[\x21-\x2f]{1,}).*$/)),
    new_password: new FormControl('', Validators.pattern(/^(?=.{8,24}$)(?=.*[A-Z]{1,})(?=.*[a-z]{1,})(?=.*\d{1,})(?=.*[\x21-\x2f]{1,}).*$/)),
  });
  id = '';
  username = '';
  name = '';
  surname = '';
  address = '';
  zip = '';
  city = '';
  birthday = new Date().toUTCString;
  email = '';
  gender = '';
  gender_specified = '';
  summoner;
  summonerLeague;

  getLoLProfile() {
    this.leagueSummonerService.leagueSummonerByName('Perion').subscribe(res => {
      console.log(res);
      this.summoner = res.summonerInfos.summoner;
      this.summonerLeague = res.summonerInfos.summonerLeague;
    });
  }

  ngOnInit() {
    console.log(this.authService.userProfile.email);
    this.profileService.getUser(this.authService.userProfile.email).subscribe(res => {
      this.username = res.user.username;
      this.name = res.user.name;
      this.surname = res.user.surname;
      this.address = res.user.address;
      this.zip = res.user.zip;
      this.city = res.user.city;
      this.birthday = new Date(res.user.birthday).toUTCString;
      this.email = res.user.email;
      this.gender = res.user.gender;
      this.gender_specified = res.user.gender_specified;
    });
  }

}
