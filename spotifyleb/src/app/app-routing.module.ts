import { AlbumDetailComponent } from './Components/core/album-detail/album-detail.component';
import { IsAuthenticatedGuard } from './Components/guards/is-authenticated.guard';
import { HomeComponent } from './Components/core/home/home.component';
import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthComponent } from './Components/auth/auth.component';
import { IsNotAuthenticatedGuard } from './Components/guards/is-not-authenticated.guard';
import { LoadUserInfoGuard } from './Components/guards/load-user-info.guard';
import { AuthcallbackComponent } from './Components/auth/authcallback/authcallback.component';
import { LoadAlbumsGuard } from './Components/guards/load-albums.guard';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    canActivate: [IsNotAuthenticatedGuard],
  },
  {
    path: 'authcallback',
    component: AuthcallbackComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [IsAuthenticatedGuard],
    data: {
      reuseRoute: true,
    },
  },
  {
    path: 'album/:id',
    component: AlbumDetailComponent,
    resolve: {
      albumData: LoadAlbumsGuard,
    },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
