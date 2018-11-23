import { Component, OnInit, AfterViewInit } from '@angular/core';
import { GoogleService } from '../google.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewInit {

  constructor(private google: GoogleService) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.google.initGapi();
  }
}
