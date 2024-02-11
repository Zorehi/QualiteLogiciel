import { Component } from '@angular/core';
import {Title} from "@angular/platform-browser";
import {Router} from "@angular/router";
import {FormControl} from "@angular/forms";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent {

  searchDevice: FormControl = new FormControl('');
  searchProfil: FormControl = new FormControl('');
  constructor(private titleService: Title,
              private router: Router,
              public authService: AuthService) {
    this.titleService.setTitle('Accueil - LocaMat');
  }

  onEnterKeySearchDevice(event: Event) {
    this.router.navigate(['device', 'search', this.searchDevice.value]);
  }

  onEnterKeySearchProfil(event: Event) {
    this.router.navigate(['profil', 'search', this.searchProfil.value]);
  }
}
