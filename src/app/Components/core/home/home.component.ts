import { AlbummanagerService } from "./../../../Services/albummanager.service";
import { artist } from "./../../../Models/artist";
import { AuthmanagerService } from "src/app/Services/authmanager.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Component, ElementRef, HostListener, OnInit } from "@angular/core";
import { textChangeRangeIsUnchanged } from "typescript";
import { ArtistmanagerService } from "src/app/Services/artistmanager.service";
import { Subject, Subscription, BehaviorSubject } from "rxjs";
import { debounceTime } from "rxjs/operators";
import { resetFakeAsyncZone } from "@angular/core/testing";
import { ThrowStmt } from "@angular/compiler";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  userInfo: any;
  searchQuery: BehaviorSubject<string> = new BehaviorSubject<string>("");
  private searchSubscription: Subscription = new Subscription();
  calledOnce = false;

  loadedArtistsMetaData: any = {};
  artists: artist[] = [];
  constructor(
    private artistManager: ArtistmanagerService,
    private albumManager: AlbummanagerService,
    private router: Router,
    private route: ActivatedRoute,
    private userData: AuthmanagerService
  ) {}

  async ngOnInit(): Promise<void> {
    this.userInfo = await this.userData.getUserInfo();
    this.setUpSubscriptions();
  }
  setUpSubscriptions() {
    this.searchSubscription = this.searchQuery
      .pipe(debounceTime(500))
      .subscribe((res: string) => {
        console.log("caught change.");
        this.handleDidSearch(res);
      });
  }
  inputChanged(searchQuery: string) {
    this.searchQuery.next(searchQuery);
  }

  handleLoadPages() {
    if (this.loadedArtistsMetaData.next === null || this.artists === []) {
      console.log("there no more pages to add");
      return;
    }
    this.artistManager
      .loadArtistPages(this.loadedArtistsMetaData.next)
      .then((res: any) => {
        const arr: any[] = res.artists.items;
        const artistArr = arr.map((element) => {
          var artist: artist = {
            id: "",
            name: "null",
            followers: 0,
            popularity: 0,
            href: "",
            imageRef: "",
          };
          artist.id = element.id;
          artist.name = element.name;
          artist.href = element.href;
          artist.followers = element.followers.total;
          artist.popularity = element.popularity;
          if (element.images[1] === null || element.images[1] === undefined) {
            artist.imageRef = "";
          } else {
            artist.imageRef = element.images[1].url;
          }
          return artist;
        });
        this.artists.push(...artistArr);
        this.loadedArtistsMetaData = res.artists;
      });
  }

  handleDidSearch(searchQuery: string) {
    console.log("hello searching for " + searchQuery);
    if (searchQuery === "") {
      return;
    }
    console.log(searchQuery);
    this.artistManager
      .searchArtist(searchQuery)
      .then((res: any) => {
        const arr: any[] = res.artists.items;
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
        this.artists = artistArr;
        this.loadedArtistsMetaData = res.artists;
        this.calledOnce = false;
        console.log(this.loadedArtistsMetaData);
      })
      .catch((err) => {
        console.log("error while getting data.");
      });
  }
  @HostListener("window:scroll", ["$event"])
  onWindowScroll(event: any) {
    if (
      document.body.clientHeight + window.scrollY + 20 >=
      document.body.scrollHeight
    ) {
      if (this.calledOnce === false) {
        this.handleLoadPages();
        console.log("tiggred");
        this.calledOnce = true;
      }
    }
  }
  showAlbumsFor(id, name) {
    this.router.navigate(["/album/" + id], { queryParams: { name: name } });
  }
  calculateStars(popularity) {
    return Math.floor(popularity / 10 / 2);
  }
  calculateEmptyStars(popularity) {
    return 5 - Math.floor(popularity / 10 / 2);
  }
}
