import { AuthmanagerService } from 'src/app/Services/authmanager.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { debounceTime } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AlbummanagerService {
  constructor(
    private HttpClient: HttpClient,
    private authManager: AuthmanagerService
  ) {}

  getAlbumsfromArtist(id) {
    if (id === null || id === undefined) {
      console.log('no need');
      return;
    }
    const headers = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + this.authManager.getAuthorizationToken()
    );
    return new Promise((resolve, reject) => {
      return this.HttpClient.get(
        'https://api.spotify.com/v1/artists/' + id + '/albums',
        {
          headers: headers,
        }
      )
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
