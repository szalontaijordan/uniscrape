import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ui';

  constructor (private http: HttpClient) {
  }

  ngOnInit() {
    window['onSignIn'] = this.onSignIn.bind(this);
  }

  onSignIn(googleUser) {
    const id_token = googleUser.getAuthResponse().id_token;
    const profile = googleUser.getBasicProfile();

    const params = {
      token: id_token,
      name: profile.getName(),
      email: profile.getEmail(),
      imgUrl: profile.getImageUrl()
    };

    const query = Object.keys(params).map(param => `${param}=${params[param]}`).join('&');
    fetch(`/api/google/auth?${query}`);
  }

  signOut() {
    const auth2 = window['gapi'].auth2.getAuthInstance();
    auth2.signOut().then(function () {
        this.http.get('/api/google/logout');
    });
  }
}
