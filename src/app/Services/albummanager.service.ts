import { AuthmanagerService } from "src/app/Services/authmanager.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { debounceTime } from "rxjs/operators";
import { album } from "../Models/album";

@Injectable({
  providedIn: "root",
})
export class AlbummanagerService {
  constructor(
    private HttpClient: HttpClient,
    private authManager: AuthmanagerService
  ) {}

  AlbumArrayFactory(originalAPIArray): album[] {
    const arr: any[] = originalAPIArray.albumData.albumData.items;
    const albumArr = arr.map((element) => {
      var album: album = {
        name: "string",
        nameOfArtist: "number",
        Date: "number",
        TrackAmount: "string",
        href: "string",
        imageRef: "string",
      };
      album.name = element.name;
      album.nameOfArtist = element.artists[0].name;
      album.Date = element.release_date;
      album.TrackAmount = element.total_tracks;
      album.href = element.external_urls.spotify;
      if (element.images[1] === null || element.images[1] === undefined) {
        album.imageRef = "/assets/";
      } else {
        album.imageRef = element.images[1].url;
      }
      return album;
    });
    return albumArr;
  }

  getAlbumsfromArtist(id) {
    if (id === null || id === undefined) {
      return;
    }
    const headers = new HttpHeaders().set(
      "Authorization",
      "Bearer " + this.authManager.getAuthorizationToken()
    );
    return new Promise((resolve, reject) => {
      return this.HttpClient.get(
        "https://api.spotify.com/v1/artists/" + id + "/albums",
        {
          headers: headers,
        }
      )
        .toPromise()
        .then((res) => resolve(res))
        .catch((err) => {
          reject(err);
          this.authManager.signOut();
        });
    });
  }
  loadArtistPages(nextPageURL: string) {
    const headers = new HttpHeaders().set(
      "Authorization",
      "Bearer " + this.authManager.getAuthorizationToken()
    );
    return new Promise((resolve, reject) => {
      return this.HttpClient.get(nextPageURL, {
        headers: headers,
      })
        .toPromise()
        .then((res) => resolve(res))
        .catch((err) => {
          reject(err);
          this.authManager.signOut();
        });
    });
  }
}
