import { AuthmanagerService } from 'src/app/Services/authmanager.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ArtistmanagerService {
  constructor(
    private HttpClient: HttpClient,
    private authManager: AuthmanagerService
  ) {}

  searchArtist(searchQuery: string) {
    const headers = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + this.authManager.getAuthorizationToken()
    );
    const params = new HttpParams().set('type', 'artist').set('q', searchQuery);

    return new Promise((resolve, reject) => {
      return this.HttpClient.get('https://api.spotify.com/v1/search', {
        params: params,
        headers: headers,
      })
        .toPromise()
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  }
  loadArtistPages(nextPageURL: string) {
    const headers = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + this.authManager.getAuthorizationToken()
    );
    return new Promise((resolve, reject) => {
      return this.HttpClient.get(nextPageURL, {
        headers: headers,
      })
        .toPromise()
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  }
}
