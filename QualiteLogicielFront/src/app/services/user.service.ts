import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {catchError, of} from "rxjs";
import {Device} from "./device.service";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  GetProfilBySearch(search: string) {
    return this.http.get<Profil[]>(`${environment.protocol}://${environment.backend}`).pipe(
      catchError(err => {
        alert("Une erreur est survenue");
        return of();
      })
    )
  }

}

export class Profil {
  id: number = 0
  nom: string = "Legrix"
  prenom: string = "Jérémy"
  email: string = ""
  password: string = ""
  matricule: string = ""
}
