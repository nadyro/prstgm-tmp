import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {

  constructor(public authService: AuthService) {
  }

  public message: string;
  authSubscribeForm = new FormGroup({
    email: new FormControl(
      '', Validators.email),
    password: new FormControl(
      '',
      Validators.pattern(/^(?=.{8,24}$)(?=.*[A-Z]{+})(?=.*[a-z]{+})(?=.*\d+,})(?=.*[\x21-\x2f]{+}).*$/)),
    username: new FormControl(
      '',
      [Validators.required,
        Validators.pattern(/^([a-zA-Z\d \xC0-\xF6\-œ\xF8-\xFF]{+})$/)])
  });

  get email() {
    return this.authSubscribeForm.get('email');
  }

  get password() {
    return this.authSubscribeForm.get('password');
  }

  get username() {
    return this.authSubscribeForm.get('username');
  }

  onSubmit() {
    this.authService.saveUser(this.authSubscribeForm.value).subscribe(res => {
      if (!res.success) {
        this.message = res.message;
      }
    });
  }

  ngOnInit() {
  }

}
