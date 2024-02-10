import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, of} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http: HttpClient) { }

  GetAllRoles() {
    return this.http.get<Role[]>(`${environment.protocol}://${environment.backend}/role/all`).pipe(
      catchError(err => {
        alert("Une erreur est survenue lors de la récupération des rôles");
        return of();
      })
    )
  }

}

export class Role {
  roleId: number
  name: string
}