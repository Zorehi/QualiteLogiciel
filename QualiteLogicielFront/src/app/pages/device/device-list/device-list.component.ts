import {Component, ElementRef, ViewChild} from '@angular/core';
import {Device, DeviceService} from "../../../services/device.service";
import {InputFieldComponent} from "../../../components/input-field/input-field.component";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-materiel-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.scss']
})
export class DeviceListComponent {

  search: string = "";

  deviceList: Device[] = [];

  constructor(private deviceService: DeviceService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    const search = this.activatedRoute.snapshot.paramMap.get('search');
    this.search = search ? search : "";
    this.deviceService.GetDeviceBySearch(this.search).subscribe((devices: Device[]) => {
      this.deviceList = devices;
    })
  }

}
