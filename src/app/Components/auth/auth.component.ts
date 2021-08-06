import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthmanagerService } from "src/app/Services/authmanager.service";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.css"],
})
export class AuthComponent implements OnInit {
  constructor(private authManager: AuthmanagerService) {}
  async ngOnInit() {}

  didClickLoginButton() {
    window.open(this.authManager.getAuthLink(), "_self");
  }
}
