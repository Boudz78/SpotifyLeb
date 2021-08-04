import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthmanagerService {
  private AUTH_TOKEN = '';
  private CLIENT_ID = environment.CLIENT_ID;
  private URL_LINK = environment.URL_LINK;
  private SPOTIFY_AUTH_URL = environment.SPOTIFY_AUTH_URL;
  isAuthed: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private auth_object: any = '';

  constructor(private HttpClient: HttpClient, private router: Router) {}
  getAuthLink = () => {
    const params = new URLSearchParams({
      client_id: this.CLIENT_ID,
      response_type: 'token',
      redirect_uri: this.URL_LINK + '/authcallback',
      scope: 'user-read-email user-read-private',
      show_dialog: 'true',
    });
    return this.SPOTIFY_AUTH_URL + params.toString();
  };
  getUserInfo = () => {
    return new Promise(async (resolve, reject) => {
      const headers = new HttpHeaders().set(
        'Authorization',
        'Bearer ' + this.getAuthorizationToken()
      );
      this.HttpClient.get('https://api.spotify.com/v1/me', { headers: headers })
        .toPromise()
        .then((res) => resolve(res))
        .catch((res) => reject(res));
    });
  };
  saveAuthorization(token: string) {
    this.AUTH_TOKEN = token;
    localStorage.setItem('token', token);
    this.isAuthed.next(true);
  }
  getAuthorizationToken() {
    try {
      return localStorage.getItem('token') + '';
    } catch (err) {
      this.router.navigate(['/']);
    }
  }
  checkIfLoggedIn() {
    if (localStorage.getItem('token')) {
      return true;
    }
    return false;
  }
  signOut() {
    this.AUTH_TOKEN = '';
    localStorage.removeItem('token');
    this.router.navigateByUrl('/');
  }
}
