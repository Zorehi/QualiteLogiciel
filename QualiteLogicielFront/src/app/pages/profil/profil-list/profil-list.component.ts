import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Profil, UserService} from "../../../services/user.service";
import {FormControl} from "@angular/forms";
import {debounceTime, distinctUntilChanged} from "rxjs";
import {Device} from "../../../services/device.service";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-profil-list',
  templateUrl: './profil-list.component.html',
  styleUrls: ['./profil-list.component.scss']
})
export class ProfilListComponent implements OnInit {
  search: string = "";
  displayedColumns: string[] = ['nom', 'prenom', 'email', 'matricule'];
  profilList: Profil[] = [];
  formControl: FormControl = new FormControl();

  constructor(private userService: UserService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              public authService: AuthService) {
  }

  ngOnInit() {
    const search = this.activatedRoute.snapshot.paramMap.get('search');
    this.search = search ? search : "";
    this.userService.GetProfilBySearch(this.search).subscribe((profil: Profil[]) => {
      this.profilList = profil;
    })

    this.formControl.setValue(this.search);
    this.formControl.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe((value: string) => {
      this.userService.GetProfilBySearch(value).subscribe((profil: Profil[]) => {
        this.profilList = profil;
      });
    });
  }

  onClickRow(profil: Profil) {
    this.router.navigate(['profil', 'info', profil.usersId]);
  }
}
