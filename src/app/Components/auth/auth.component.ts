import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthmanagerService } from 'src/app/Services/authmanager.service';
import { PlaylistmanagerService } from 'src/app/Services/playlistmanager.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  constructor(
    private router: Router,
    private authManager: AuthmanagerService,
    private playlistManager: PlaylistmanagerService,
    private route: ActivatedRoute
  ) {}
  async ngOnInit() {}

  didClickLoginButton() {
    window.open(this.authManager.getAuthLink(), '_self');
  }
  didClickGetArtists() {
    // this.playlistManager.searchArtist();
    this.authManager
      .getUserInfo()
      .then((res) => console.log(res))
      .catch((res) => console.log(res));
  }
}
