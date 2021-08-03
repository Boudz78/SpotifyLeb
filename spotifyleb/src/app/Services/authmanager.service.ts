import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthmanagerService {
  private CLIENT_ID = environment.CLIENT_ID;
  private URL_LINK = environment.URL_LINK;
  private SPOTIFY_AUTH_URL = environment.SPOTIFY_AUTH_URL;

  private auth_object: any = '';

  constructor(private HttpClient: HttpClient) {}
  getAuthLink = () => {
    const params = new URLSearchParams({
      client_id: this.CLIENT_ID,
      response_type: 'token',
      redirect_uri: this.URL_LINK + 'authResponse',
      scope: 'user-read-email user-read-private',
    });
    return this.SPOTIFY_AUTH_URL + params.toString();
  };
  saveAuthorization(auth_object: any) {
    this.auth_object = auth_object;
  }
  getAuthorizationToken() {
    return 'Bearer ' + this.auth_object.access_token;
  }
}
