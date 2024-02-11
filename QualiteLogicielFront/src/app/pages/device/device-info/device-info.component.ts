import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Title} from "@angular/platform-browser";
import {ActivatedRoute, Router} from "@angular/router";
import {Device, DeviceService} from "../../../services/device.service";
import {AuthService} from "../../../services/auth.service";

const regNomObjet: RegExp = new RegExp('^[^\\n\\r\\t\\v\\f]{1,30}$');
const regVersion: RegExp = new RegExp('^[a-zA-Z0-9.]{3,15}$');
const regReference: RegExp = new RegExp('^(AN|AP|XX)\\d{3}$');
const regPhoneNumber: RegExp = new RegExp('^\\d{10}$');

@Component({
  selector: 'app-materiel-info',
  templateUrl: './device-info.component.html',
  styleUrls: ['./device-info.component.scss']
})
export class DeviceInfoComponent implements OnInit {
  @ViewChild("button") button: ElementRef<HTMLButtonElement>
  deviceForm: FormGroup
  device: Device = new Device();
  IsBooked: boolean = false;
  IsBookedByMe: boolean = false;
  constructor(private fb: FormBuilder,
              private titleService: Title,
              private activatedRoute: ActivatedRoute,
              private deviceService: DeviceService,
              private router: Router,
              public authService: AuthService) {
    this.titleService.setTitle('Materiel informations - LocaMat');
    this.deviceForm = this.fb.group({
      ID: ["", [Validators.required]],
      nom: ["", [Validators.required, Validators.pattern(regNomObjet)]],
      version: ["", [Validators.required, Validators.pattern(regVersion)]],
      ref: ["", [Validators.required, Validators.pattern(regReference)]],
      img: [""],
      num: ["", [Validators.pattern(regPhoneNumber)]]
    });

    this.deviceForm.controls["ID"].disable();
    this.deviceForm.controls["nom"].disable();
    this.deviceForm.controls["version"].disable();
    this.deviceForm.controls["ref"].disable();
    this.deviceForm.controls["num"].disable();
  }

  ngOnInit(): void {
    let IdRouted = this.activatedRoute.snapshot.params['id'];
    let idDevice = IdRouted ? Number.parseInt(IdRouted) : 0;
    if (idDevice) {
      this.deviceService.GetDeviceById(idDevice).subscribe(data => {
        if (data) {
          this.device = data;
          this.deviceForm.controls["ID"].setValue(this.device.deviceId);
          this.deviceForm.controls["nom"].setValue(this.device.name);
          this.deviceForm.controls["version"].setValue(this.device.version);
          this.deviceForm.controls["ref"].setValue(this.device.deviceRef);
          this.deviceForm.controls["num"].setValue(this.device.phoneNumber);
        }
      });
      this.deviceService.GetIsBooked(idDevice).subscribe(data => {
        this.IsBooked = data;
      });
      this.deviceService.GetIsBookedByMe(idDevice, this.authService.AuthenticatedUser.usersId).subscribe(data => {
        this.IsBookedByMe = data;
      });
    } else {
      this.router.navigate(['accueil']);
    }
  }

  onClickModifier() {
    if (this.button.nativeElement.textContent == "Modifier") {
      this.deviceForm.controls["ID"].enable();
      this.deviceForm.controls["nom"].enable();
      this.deviceForm.controls["version"].enable();
      this.deviceForm.controls["ref"].enable();
      this.deviceForm.controls["num"].enable();
      this.button.nativeElement.textContent = "Enregistrer"
    } else {
      this.deviceForm.controls["ID"].disable();
      this.deviceForm.controls["nom"].disable();
      this.deviceForm.controls["version"].disable();
      this.deviceForm.controls["ref"].disable();
      this.deviceForm.controls["num"].disable();
      this.button.nativeElement.textContent = "Modifier"
      // Requete
      let device: Device = {
        deviceId: this.device.deviceId,
        deviceRef: this.deviceForm.controls["ref"].value,
        image: undefined,
        name: this.deviceForm.controls["nom"].value,
        phoneNumber: this.deviceForm.controls["num"].value,
        version: this.deviceForm.controls["version"].value
      }
      this.deviceService.PatchDevice(device).subscribe(() => {
        alert("Materiel modifié avec succès");
      });
    }
  }

  onClickSupprimer() {
    this.deviceService.DeleteDevice(this.device.deviceId).subscribe(data => {
      this.router.navigate(['device', 'search', '']);
    });
  }

  onClickReserver() {
    this.deviceService.PostBook(this.device.deviceId, this.authService.AuthenticatedUser.usersId).subscribe(data => {
      this.IsBooked = true;
      this.IsBookedByMe = true;
      alert("Materiel réservé avec succès");
    });
  }

  onClickReturn() {
    this.deviceService.PostBookReturn(this.device.deviceId, this.authService.AuthenticatedUser.usersId).subscribe(data => {
      this.IsBooked = false;
      this.IsBookedByMe = false;
      alert("Materiel retourné avec succès");
    });
  }
}
