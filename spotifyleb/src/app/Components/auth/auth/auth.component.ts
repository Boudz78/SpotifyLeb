import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthmanagerService } from 'src/app/Services/authmanager.service';
import { PlaylistmanagerService } from 'src/app/Services/playlistmanager.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  constructor(
    private authManager: AuthmanagerService,
    private playlistManager: PlaylistmanagerService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    const fragment = this.route.snapshot.fragment;
    const params = {
      access_token: new URLSearchParams(fragment).get('access_token'),
      token_type: new URLSearchParams(fragment).get('token_type'),
      expires_in: new URLSearchParams(fragment).get('expires_in'),
    };
    this.authManager.saveAuthorization(params);
    console.log(params);
  }

  didClickLoginButton() {
    window.open(this.authManager.getAuthLink(), '_self');
  }
  didClickGetArtists() {
    this.playlistManager.searchArtist();
  }
}
