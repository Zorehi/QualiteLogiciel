import { Component } from '@angular/core';
import {Title} from "@angular/platform-browser";
import {Router} from "@angular/router";

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent {

  searchDevice: string = "";
  searchProfil: string = "";
  constructor(private titleService: Title,
              private router: Router) {
    this.titleService.setTitle('Accueil - LocaMat');
  }

  onEnterKeySearchDevice(event: Event) {
    this.router.navigate(['device', 'search', this.searchDevice]);
  }

  onEnterKeySearchProfil(event: Event) {
    this.router.navigate(['profil', 'search', this.searchProfil]);
  }
}
