import {Component, Input} from '@angular/core';
import {Device} from "../../services/device.service";

@Component({
  selector: 'app-device-card',
  templateUrl: './device-card.component.html',
  styleUrls: ['./device-card.component.scss']
})
export class DeviceCardComponent {
  @Input("device") device: Device;

  constructor() {
  }


}
