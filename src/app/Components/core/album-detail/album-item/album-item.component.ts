import { Location } from "@angular/common";
import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-album-item",
  templateUrl: "./album-item.component.html",
  styleUrls: ["./album-item.component.css"],
})
export class AlbumItemComponent implements OnInit {
  @Input() album;

  constructor() {}

  ngOnInit(): void {}
  openURL(url) {
    window.open(url, "_blank").focus();
  }
}
