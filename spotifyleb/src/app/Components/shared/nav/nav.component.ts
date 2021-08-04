import { AuthmanagerService } from 'src/app/Services/authmanager.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  showSignOut = false;
  constructor(private AuthmanagerService: AuthmanagerService) {}

  ngOnInit(): void {
    this.AuthmanagerService.isAuthed.subscribe((res) => {
      if (res === true) {
        this.showSignOut = true;
      } else {
        this.showSignOut = false;
      }
    });
  }
  handleSignOut() {
    this.AuthmanagerService.signOut();
  }
}
