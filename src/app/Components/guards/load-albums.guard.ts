import { AlbummanagerService } from './../../Services/albummanager.service';
import { Injectable } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  CanActivate,
  Params,
  Resolve,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthmanagerService } from 'src/app/Services/authmanager.service';

@Injectable({
  providedIn: 'root',
})
export class LoadAlbumsGuard implements Resolve<any> {
  constructor(
    private albumManager: AlbummanagerService,
    private route: ActivatedRoute
  ) {}
  async resolve(route: ActivatedRouteSnapshot) {
    console.log(route.queryParams.name);
    return {
      albumData: await this.albumManager.getAlbumsfromArtist(route.params.id),
      artistName: route.queryParams.name,
    };
  }
}
