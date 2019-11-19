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

  genderValidator = 0;
  tooltipValidator = 0;
  formattedMessage;
  items = Array<any>();
  selected = Array<any>();
  authSubscribeForm = new FormGroup({
    name: new FormControl(
      '',
      [Validators.required,
        Validators.pattern(/^([A-Za-z\- \xC0-\xF6\xF8-\xFF]{+})$/)]),
    surname: new FormControl(
      '',
      [Validators.required,
        Validators.pattern(/^([A-Za-z\- \xC0-\xF6\xF8-\xFF]{+})$/)]),
    email: new FormControl(
      '', Validators.email),
    password: new FormControl(
      '',
      Validators.pattern(/^(?=.{8,24}$)(?=.*[A-Z]{+})(?=.*[a-z]{+})(?=.*\d+,})(?=.*[\x21-\x2f]{+}).*$/)),
    birthday: new FormControl(
      '',
      Validators.required),
    gender: new FormControl(
      '',
      Validators.required),
    gender_specified: new FormControl(
      '',
      Validators.pattern(/^([A-Za-z\- \xC0-\xF6\xF8-\xFF]{+})$/)),
    address: new FormControl(
      '',
      [Validators.required,
        Validators.pattern(/^([0-9]{1,5})([ ])([a-z]{+})([ ])([A-za-z\xC0-\xF6\-œ\xF8-\xFF]{+}[ ]{?})+$/)]),
    zip: new FormControl(
      '',
      [Validators.required,
        Validators.pattern(/^[0-9]{1,10}$/)]),
    city: new FormControl(
      '',
      [Validators.required,
        Validators.pattern(/^([A-Za-z\- \xC0-\xF6\xF8-\xFF]{+})$/)]),
    username: new FormControl(
      '',
      [Validators.required,
        Validators.pattern(/^([a-zA-Z\d \xC0-\xF6\-œ\xF8-\xFF]{+})$/)])
  });

  get name() {
    return this.authSubscribeForm.get('name');
  }

  get surname() {
    return this.authSubscribeForm.get('surname');
  }

  get email() {
    return this.authSubscribeForm.get('email');
  }

  get password() {
    return this.authSubscribeForm.get('password');
  }

  get birthday() {
    return this.authSubscribeForm.get('birthday');
  }

  get gender() {
    return this.authSubscribeForm.get('gender');
  }

  get gender_specified() {
    return this.authSubscribeForm.get('gender_specified');
  }

  get address() {
    return this.authSubscribeForm.get('address');
  }

  get zip() {
    return this.authSubscribeForm.get('zip');
  }

  get city() {
    return this.authSubscribeForm.get('city');
  }

  get username() {
    return this.authSubscribeForm.get('username');
  }

  specifyGender(value) {
    if (value.target.value === '3') {
      this.genderValidator = 1;
    } else if (value.target.value === '4') {
      this.genderValidator = 2;
    } else {
      this.genderValidator = 0;
    }
  }

  onSubmit(id) {
    this.authService.saveUser(this.authSubscribeForm.value).subscribe(res => {
      console.log(res);
    });
    console.warn(this.authSubscribeForm.value, id);
  }

  onChanges() {
    this.authSubscribeForm.get('birthday').valueChanges.subscribe(() => {
      this.tooltipValidator = 1;
      this.formattedMessage = 'If you\'re above 25, rumors say that you lose more cells than you make. ' +
        'This means that you are dying... Science is awesome sometimes !';
    });
  }

  display_tooltip(event) {
    console.log(event);
    event.target.nextSibling.style.display = 'block';
  }

  hide_tooltip(event) {
    console.log(event);
    event.target.nextSibling.style.display = 'none';
  }

  displaySelected(element) {
    console.log(element);
  }

  ngOnInit() {
    this.onChanges();
    this.items = [
      {id: 1, name: 'Python'},
      {id: 2, name: 'Node Js'},
      {id: 3, name: 'Java'},
      {id: 4, name: 'PHP'},
      {id: 5, name: 'Django'},
      {id: 6, name: 'Angular'},
      {id: 7, name: 'Vue'},
      {id: 8, name: 'ReactJs'},
    ];
    this.selected = [
      {id: 2, name: 'Node Js'},
      {id: 8, name: 'ReactJs'}
    ];
    this.authService.connect().subscribe(res => {
      console.log(res);
    });
  }

}
