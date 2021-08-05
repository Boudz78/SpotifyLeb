import { AuthmanagerService } from 'src/app/Services/authmanager.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  constructor(public AuthmanagerService: AuthmanagerService) {}

  ngOnInit(): void {}
  handleSignOut() {
    this.AuthmanagerService.signOut();
  }
}
