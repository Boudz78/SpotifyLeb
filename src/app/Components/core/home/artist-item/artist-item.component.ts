import { artist } from "./../../../../Models/artist";
import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-artist-item",
  templateUrl: "./artist-item.component.html",
  styleUrls: ["./artist-item.component.css"],
})
export class ArtistItemComponent implements OnInit {
  @Input() artist: artist;
  constructor() {}

  ngOnInit(): void {}
  calculateStars(popularity) {
    return Math.ceil(popularity / 10 / 2);
  }
  calculateEmptyStars(popularity) {
    return 5 - Math.ceil(popularity / 10 / 2);
  }
}
