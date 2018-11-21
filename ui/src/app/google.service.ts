import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GoogleService {

  private CLIENT_CONFIG = {
    client_id: document.getElementsByName('google-signin-client_id')[0]['content'],
    cookiepolicy: 'single_host_origin'
  };

  constructor(private http: HttpClient, private router: Router) {
  }

  initGapi() {
    const gapi = window['gapi'];

    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark',
      'onsuccess': this.onSignIn.bind(this),
      'onfailure': console.log
    });
  }

  private onSignIn(googleUser) {
    const id_token = googleUser.getAuthResponse().id_token;
    const profile = googleUser.getBasicProfile();

    const params = {
      token: id_token,
      name: profile.getName(),
      email: profile.getEmail(),
      imgUrl: profile.getImageUrl()
    };

    this.http.get('/api/google/auth', { params }).subscribe(() => this.router.navigate(['home']));
  }

  logout() {
    window['gapi'].auth2.init(this.CLIENT_CONFIG);

    const auth2 = window['gapi'].auth2.getAuthInstance();
    this.http.get('/api/google/logout').subscribe(async () => {
      await auth2.signOut();
      auth2.disconnect();

      await this.router.navigate(['login']);
      this.initGapi();
    });
  }
}
