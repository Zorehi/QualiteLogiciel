import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Profil} from "../../services/user.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  profil: Profil = new Profil();

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.profil = this.authService.AuthenticatedUser;
  }
}
