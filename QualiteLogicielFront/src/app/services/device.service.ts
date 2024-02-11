
import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {catchError, map, of} from "rxjs";
import {Profil} from "./user.service";

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

  GetDeviceById(id: number) {
    return this.http.get<Device>(`${environment.protocol}://${environment.backend}/device/get?id=${id}`).pipe(
      catchError(err => {
        alert("Une erreur est survenue lors de la récupération d'un materiel");
        return of();
      })
    )
  }

  DeleteDevice(id: number) {
    return this.http.delete(`${environment.protocol}://${environment.backend}/device/delete/${id}`).pipe(
      catchError(err => {
        alert("Une erreur est survenue lors de la suppression d'un materiel");
        return of();
      })
    )
  }

  GetIsBooked(id: number) {
    return this.http.get<boolean>(`${environment.protocol}://${environment.backend}/book/isbook?deviceid=${id}`).pipe(
      catchError(err => {
        alert("Une erreur est survenue lors de la vérification de la réservation");
        return of();
      })
    )
  }

  GetIsBookedByMe(deviceId: number, usersId: number) {
    return this.http.get<boolean>(`${environment.protocol}://${environment.backend}/book/getdevice?userid=${usersId}&deviceid=${deviceId}`).pipe(
      catchError(err => {
        alert("Une erreur est survenue lors de la vérification de la réservation");
        return of();
      })
    )
  }

  PostBook(deviceId: number, usersId: number) {
    return this.http.post(`${environment.protocol}://${environment.backend}/book/create`, {
      deviceId: deviceId,
      usersId: usersId
    }).pipe(
      catchError(err => {
        alert("Une erreur est survenue lors de la réservation");
        return of();
      })
    )
  }

  GetBookByUsersId(usersId: number) {
    return this.http.get<Book[]>(`${environment.protocol}://${environment.backend}/book/get?id=${usersId}`).pipe(
      catchError(err => {
        alert("Une erreur est survenue lors de la récupération des réservations");
        return of();
      })
    )
  }

  PostBookReturn(deviceId: number, usersId: number) {
    return this.http.post(`${environment.protocol}://${environment.backend}/book/finish?userid=${usersId}&deviceid=${deviceId}`, {}).pipe(
      catchError(err => {
        alert("Une erreur est survenue lors de la restitution");
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

export class Book {
  id: {
    deviceId: number
    startDate: [
      number,
      number,
      number,
      number,
      number,
      number,
    ]
  }
  device: Device
  startDate: [
    number,
    number,
    number,
    number,
    number,
    number,
  ]
  endDate: [
    number,
    number,
    number,
    number,
    number,
    number,
  ]
  user: Profil
}
