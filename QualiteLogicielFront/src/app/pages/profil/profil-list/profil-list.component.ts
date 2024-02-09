import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Profil, UserService} from "../../../services/user.service";

@Component({
  selector: 'app-profil-list',
  templateUrl: './profil-list.component.html',
  styleUrls: ['./profil-list.component.scss']
})
export class ProfilListComponent {
  search: string = "";

  profilList: Profil[] = [];

  constructor(private userService: UserService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    const search = this.activatedRoute.snapshot.paramMap.get('search');
    this.search = search ? search : "";
    this.userService.GetProfilBySearch(this.search).subscribe((profil: Profil[]) => {
      this.profilList = profil;
    })
  }
}
