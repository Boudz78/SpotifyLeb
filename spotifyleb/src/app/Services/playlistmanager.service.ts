import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthmanagerService } from './authmanager.service';

@Injectable({
  providedIn: 'root',
})
export class PlaylistmanagerService {
  constructor(
    private HttpClient: HttpClient,
    private authManager: AuthmanagerService
  ) {}

  searchArtist() {
    const headers = new HttpHeaders().set(
      'Authorization',
      this.authManager.getAuthorizationToken()
    );
    const params = new HttpParams().set('type', 'artist').set('q', 'ColdPlay');
    this.HttpClient.get('https://api.spotify.com/v1/search', {
      params: params,
      headers: headers,
    })
      .toPromise()
      .then((res) => console.log(res));
  }
}
