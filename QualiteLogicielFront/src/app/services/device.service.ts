
import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {catchError, map, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  constructor(private http: HttpClient) { }

  GetDeviceBySearch(search: string) {
    return this.http.get<Device[]>(`${environment.protocol}://${environment.backend}`).pipe(
      catchError(err => {
        alert("Une erreur est survenue");
        return of();
      })
    )
  }

}

export class Device {
  id: number;
  name: string;
  version: string;
  ref: string;
  image?: File;
  numTel?: string;
}
