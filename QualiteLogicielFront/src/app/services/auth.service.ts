import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, map, Observable, of} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  IsLogged: boolean = false;

  constructor(private http: HttpClient) { }

  PostLogin(email: string, password: string) {
    return this.http.post(`${environment.protocol}://${environment.backend}`, {
      email: email,
      password: password
    }).pipe(
      catchError(err => {
        alert("Une erreur est survenue");
        return of();
      }),
      map((data) => {
        if (data) {
          this.IsLogged = true;
        }
        return of(data);
      })
    )
  }

  PatchPassword(idUser: number, newPassword: string) {
    return this.http.post(`${environment.protocol}://${environment.backend}`, {
      id: idUser,
      newPassword: newPassword
    }).pipe(
      catchError(err => {
        alert("Une erreur est survenue");
        return of();
      })
    )
  }
}
