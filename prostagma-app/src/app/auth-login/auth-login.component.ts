import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-auth-login',
  templateUrl: './auth-login.component.html',
  styleUrls: ['./auth-login.component.scss']
})
export class AuthLoginComponent implements OnInit {

  constructor(public authService: AuthService) { }

  public message: string;
  authLoginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  onSubmit(id) {
    console.log(id);
    this.authService.log(this.authLoginForm.value).subscribe(res => {
      if (!res.success) {
        this.message = res.message;
      }
    });
  }
  ngOnInit() {
  }

}
