import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, map, Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  IsLogged: boolean = false;

  constructor(private http: HttpClient) { }

  PostLogin(email: string, password: string) {
    return this.http.post("", {
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
    return this.http.post("", {
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
