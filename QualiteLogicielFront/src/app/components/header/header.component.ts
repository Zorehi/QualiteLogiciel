import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Profil} from "../../services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  profil: Profil;
  constructor(private authService: AuthService,
              private router: Router) {
  }

  ngOnInit() {
    this.profil = this.authService.AuthenticatedUser;
  }

  onClickDeconnexion() {
    this.authService.IsAuthenticated = false;
    this.authService.AuthenticatedUser = new Profil();
    this.router.navigate(['auth', 'sign-in']);
  }
}
