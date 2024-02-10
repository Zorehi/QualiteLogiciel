import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Device, DeviceService} from "../../../services/device.service";
import {InputFieldComponent} from "../../../components/input-field/input-field.component";
import {ActivatedRoute} from "@angular/router";
import {debounceTime, distinctUntilChanged} from "rxjs";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-materiel-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.scss']
})
export class DeviceListComponent implements OnInit {

  search: string = "";
  displayedColumns: string[] = ['name', 'version', 'ref', 'numTel'];
  deviceList: Device[] = [];
  formControl: FormControl = new FormControl();

  constructor(private deviceService: DeviceService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    const search = this.activatedRoute.snapshot.paramMap.get('search');
    this.search = search ? search : "";
    this.deviceService.GetDeviceBySearch(this.search).subscribe((devices: Device[]) => {
      this.deviceList = devices;
    })

    this.formControl.setValue(this.search);
    this.formControl.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe((value: string) => {
      this.deviceService.GetDeviceBySearch(value).subscribe((devices: Device[]) => {
        this.deviceList = devices;
      });
    });
  }

  protected readonly Device = Device;
}
