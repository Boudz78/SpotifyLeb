import { LoadingManagerService } from './Services/loading-manager.service';
import { Component } from '@angular/core';
import { AuthmanagerService } from './Services/authmanager.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'spotifyleb';
  isLoading: boolean = false;

  constructor(public LoadingManager: LoadingManagerService) {}
  ngOnInit(): void {}
}
