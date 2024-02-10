
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
    return this.http.get<Device[]>(`${environment.protocol}://${environment.backend}/device/search?name=${search}`).pipe(
      catchError(err => {
        alert("Une erreur est survenue lors de la recherche de materiel");
        return of();
      })
    )
  }

  PutDevice(device: Device) {
    return this.http.put(`${environment.protocol}://${environment.backend}/device/add`, device).pipe(
      catchError(err => {
        alert("Une erreur est survenue lors de l'ajout d'un materiel");
        return of();
      })
    )
  }

  PatchDevice(device: Device) {
    return this.http.patch(`${environment.protocol}://${environment.backend}/device/modify`, device).pipe(
      catchError(err => {
        alert("Une erreur est survenue lors de la modification d'un materiel");
        return of();
      })
    )
  }

}

export class Device {
  deviceId: number;
  name: string;
  version: string;
  deviceRef: string;
  image?: File;
  phoneNumber?: string;
}
