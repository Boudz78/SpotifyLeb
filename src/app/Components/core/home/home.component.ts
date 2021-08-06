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
        this.handleDidSearch(res);
      });
  }
  inputChanged(searchQuery: string) {
    this.searchQuery.next(searchQuery);
  }

  handleLoadPages() {
    if (this.loadedArtistsMetaData.next === null || this.artists === []) {
      return;
    }
    this.artistManager
      .loadArtistPages(this.loadedArtistsMetaData.next)
      .then((res: any) => {
        this.artists.push(...this.artistManager.artistArrayFactory(res));
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
        console.log(res);
        this.artists = this.artistManager.artistArrayFactory(res);
        this.loadedArtistsMetaData = res.artists;
        this.calledOnce = false;
      })
      .catch((err) => {
        console.log("error while getting data.");
      });
  }
  //Listen when a user scrolls to bottom page.
  @HostListener("window:scroll", ["$event"])
  onWindowScroll(event: any) {
    if (
      document.body.clientHeight + window.scrollY + 20 >=
      document.body.scrollHeight
    ) {
      if (this.calledOnce === false) {
        this.handleLoadPages();
        this.calledOnce = true;
      }
    }
  }

  showAlbumsFor(id, name) {
    this.router.navigate(["/album/" + id], { queryParams: { name: name } });
  }
}
