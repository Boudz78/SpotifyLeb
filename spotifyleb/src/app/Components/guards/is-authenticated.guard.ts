import { AuthmanagerService } from 'src/app/Services/authmanager.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class IsAuthenticatedGuard implements CanActivate {
  constructor(
    private authManager: AuthmanagerService,
    private router: Router
  ) {}
  canActivate() {
    if (this.authManager.checkIfLoggedIn()) {
      return true;
    } else {
      this.router.navigateByUrl('/');
      return false;
    }
  }
}
