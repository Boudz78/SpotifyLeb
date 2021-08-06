import { AlbummanagerService } from "./../../../Services/albummanager.service";
import { Component, HostListener, OnInit } from "@angular/core";
import { Location } from "@angular/common";
import { debounceTime } from "rxjs/operators";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { album } from "src/app/Models/album";

@Component({
  selector: "app-album-detail",
  templateUrl: "./album-detail.component.html",
  styleUrls: ["./album-detail.component.css"],
})
export class AlbumDetailComponent implements OnInit {
  AlbumArtist = "John Smith";
  Album: album[] = [];
  loadedAlbumMetaData;
  calledOnce = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private albumManager: AlbummanagerService
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe((res) => {
      this.AlbumArtist = res.albumData.artistName;
      this.Album = this.albumManager.AlbumArrayFactory(res);
      this.loadedAlbumMetaData = res.albumData.albumData;
    });
    window.scroll(0, 0);
  }
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
  handleLoadPages() {
    if (
      this.loadedAlbumMetaData.next === null ||
      this.loadedAlbumMetaData === []
    ) {
      console.log("there no more pages to add");
      return;
    }
    this.albumManager
      .loadArtistPages(this.loadedAlbumMetaData.next)
      .then((res: any) => {
        const arr: any[] = res.items;
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
        this.Album.push(...albumArr);
        this.loadedAlbumMetaData = res;
        this.calledOnce = false;
      });
  }
  didGoBack() {
    this.location.back();
  }
  clearPosParam() {
    this.router.navigate(["."], { relativeTo: this.route, queryParams: {} });
  }
}
