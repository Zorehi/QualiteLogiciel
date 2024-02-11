import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {catchError, of} from "rxjs";
import {Device} from "./device.service";
import {HttpClient} from "@angular/common/http";
import {Role} from "./role.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  GetProfilBySearch(search: string) {
    return this.http.get<Profil[]>(`${environment.protocol}://${environment.backend}/users/search?matricule=${search}`).pipe(
      catchError(err => {
        alert("Une erreur est survenue lors de la recherche du profil");
        return of();
      })
    )
  }

  GetProfilById(id: number) {
    return this.http.get<Profil>(`${environment.protocol}://${environment.backend}/users/get?id=${id}`).pipe(
      catchError(err => {
        alert("Une erreur est survenue lors de la récupération du profil");
        return of();
      })
    )
  }

  PutProfil(profil: Profil) {
    return this.http.put(`${environment.protocol}://${environment.backend}/users/add`, profil).pipe(
      catchError(err => {
        alert("Une erreur est survenue lors de l'ajout du profil");
        return of();
      })
    )
  }

  PatchProfil(profil: Profil) {
    return this.http.patch(`${environment.protocol}://${environment.backend}/users/modify`, profil).pipe(
      catchError(err => {
        alert("Une erreur est survenue lors de la modifictaion du profil");
        return of();
      })
    )
  }

  DeleteProfil(id: number) {
    return this.http.delete(`${environment.protocol}://${environment.backend}/users/delete?id=${id}`).pipe(
      catchError(err => {
        alert("Une erreur est survenue lors de la suppression du profil");
        return of();
      })
    )
  }

}

export class Profil {
  usersId: number
  lastname: string
  firstname: string
  email: string
  password: string
  matricule: string
  firstConnection: boolean
  role: Role
}
