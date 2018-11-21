import { Component, OnInit } from '@angular/core';
import { GoogleService } from '../google.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor (private google: GoogleService) {
  }

  ngOnInit() {
  }

  signOut() {
    window['gapi'].load('auth2', () => this.logout());
  }

  private async logout() {
    this.google.logout();
  }

}
