import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss']
})
export class TeamsComponent implements OnInit {

  constructor(private authService : AuthService) { }

  ngOnInit() {
    this.authService.team().subscribe(res=> {
      console.log(res);
    })
  }

}
