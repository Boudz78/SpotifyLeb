import { AuthmanagerService } from 'src/app/Services/authmanager.service';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IsNotAuthenticatedGuard implements CanActivate {
  constructor(
    private authService: AuthmanagerService,
    private router: Router
  ) {}
  canActivate() {
    if (!this.authService.checkIfLoggedIn()) {
      return true;
    }
    this.router.navigateByUrl('/home');
    return false;
  }
}
