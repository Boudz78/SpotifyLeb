import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './Components/auth/auth.component';
import { NavComponent } from './Components/shared/nav/nav.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { HomeComponent } from './Components/core/home/home.component';
import { AuthcallbackComponent } from './Components/auth/authcallback/authcallback.component';
import { HttpinterceptorService } from './Services/httpinterceptor.service';
import { RouteReuseStrategy } from '@angular/router';
import { CustomReuseStrategy } from './Services/route-reuse-service.service';
import { AlbumDetailComponent } from './Components/core/album-detail/album-detail.component';
import { FooterComponent } from './Components/shared/footer/footer.component';
import { NumberSuffixPipe } from './pipes/number-suffix.pipe';
import { ArtistItemComponent } from './Components/core/home/artist-item/artist-item.component';
import { AlbumItemComponent } from './Components/core/album-detail/album-item/album-item.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    NavComponent,
    HomeComponent,
    AuthcallbackComponent,
    AlbumDetailComponent,
    FooterComponent,
    NumberSuffixPipe,
    ArtistItemComponent,
    AlbumItemComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpinterceptorService,
      multi: true,
    },
    {
      provide: RouteReuseStrategy,
      useClass: CustomReuseStrategy,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
