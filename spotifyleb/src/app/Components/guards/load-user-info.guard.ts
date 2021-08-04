import { AuthmanagerService } from 'src/app/Services/authmanager.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LoadUserInfoGuard implements Resolve<any> {
  constructor(private authManager: AuthmanagerService) {}
  async resolve(route: ActivatedRouteSnapshot) {
    // return await this.authManager.getUserInfo();
  }
}
