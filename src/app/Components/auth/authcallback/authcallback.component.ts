import { AuthmanagerService } from 'src/app/Services/authmanager.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-authcallback',
  templateUrl: './authcallback.component.html',
  styleUrls: ['./authcallback.component.css'],
})
export class AuthcallbackComponent implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authManager: AuthmanagerService
  ) {}

  ngOnInit(): void {
    if (this.route.snapshot.fragment !== null) {
      const obj = {
        access_token: new URLSearchParams(this.route.snapshot.fragment).get(
          'access_token'
        ),
        token_type: new URLSearchParams(this.route.snapshot.fragment).get(
          'token_type'
        ),
        expires_in: new URLSearchParams(this.route.snapshot.fragment).get(
          'expires_in'
        ),
      };
      console.log(obj);
      this.authManager.saveAuthorization(obj.access_token + '');
      this.router.navigate(['/']);
    }
  }
}
