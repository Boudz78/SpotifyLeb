import { AuthmanagerService } from "src/app/Services/authmanager.service";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { artist } from "../Models/artist";

@Injectable({
  providedIn: "root",
})
export class ArtistmanagerService {
  constructor(
    private HttpClient: HttpClient,
    private authManager: AuthmanagerService
  ) {}

  artistArrayFactory(originalArtistAPI): artist[] {
    const arr: any[] = originalArtistAPI.artists.items;
    const artistArr = arr.map((element) => {
      var artist: artist = {
        id: "null",
        name: "null",
        followers: 0,
        popularity: 0,
        href: "",
        imageRef: "string",
      };
      artist.id = element.id;
      artist.name = element.name;
      artist.followers = element.followers.total;
      artist.popularity = element.popularity;
      artist.href = element.href;
      if (element.images[1] === null || element.images[1] === undefined) {
        artist.imageRef = "/assets/";
      } else {
        artist.imageRef = element.images[1].url;
      }
      return artist;
    });
    return artistArr;
  }

  searchArtist(searchQuery: string) {
    const headers = new HttpHeaders().set(
      "Authorization",
      "Bearer " + this.authManager.getAuthorizationToken()
    );
    const params = new HttpParams().set("type", "artist").set("q", searchQuery);

    return new Promise((resolve, reject) => {
      return this.HttpClient.get("https://api.spotify.com/v1/search", {
        params: params,
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
