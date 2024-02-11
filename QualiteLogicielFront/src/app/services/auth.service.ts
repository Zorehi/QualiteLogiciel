import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, map, Observable, of} from "rxjs";
import {environment} from "../../environments/environment";
import {Profil} from "./user.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  IsAuthenticated: boolean = false;
  AuthenticatedUser: Profil = new Profil();

  constructor(private http: HttpClient) { }

  PostLogin(email: string, password: string) {
    return this.http.post<{ success: boolean, firstConnection: boolean, user: Profil }>(`${environment.protocol}://${environment.backend}/login/trylogin`, {
      email: email,
      password: password
    }).pipe(
      catchError(err => {
        alert("Une erreur est survenue");
        return of();
      })
    )
  }

  PatchPassword(idUser: number, newPassword: string) {
    return this.http.patch(`${environment.protocol}://${environment.backend}/login/firstconnection`, {
      id: idUser,
      password: newPassword
    }).pipe(
      catchError(err => {
        alert("Une erreur est survenue");
        return of();
      })
    )
  }
}
