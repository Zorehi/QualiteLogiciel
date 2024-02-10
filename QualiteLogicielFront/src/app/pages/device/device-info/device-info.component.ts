import {Component, ElementRef, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Title} from "@angular/platform-browser";

const regNomObjet: RegExp = new RegExp('^[^\\n\\r\\t\\v\\f]{1,30}$');
const regVersion: RegExp = new RegExp('^[a-zA-Z0-9.]{3,15}$');
const regReference: RegExp = new RegExp('^(AN|AP|XX)\\d{3}$');

@Component({
  selector: 'app-materiel-info',
  templateUrl: './device-info.component.html',
  styleUrls: ['./device-info.component.scss']
})
export class DeviceInfoComponent {
  @ViewChild("button") button: ElementRef<HTMLButtonElement>
  deviceForm: FormGroup
  constructor(private fb: FormBuilder,
              private titleService: Title) {
    this.titleService.setTitle('Materiel informations - LocaMat');
    this.deviceForm = this.fb.group({
      ID: ["", [Validators.required]],
      nom: ["", [Validators.required, Validators.pattern(regNomObjet)]],
      version: ["", [Validators.required, Validators.pattern(regVersion)]],
      ref: ["", [Validators.required, Validators.pattern(regReference)]],
      img: ["", [Validators.required]],
      num: ["", [Validators.required]]
    });

    this.deviceForm.controls["ID"].disable();
    this.deviceForm.controls["nom"].disable();
    this.deviceForm.controls["version"].disable();
    this.deviceForm.controls["ref"].disable();
    this.deviceForm.controls["num"].disable();
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
    }
  }
}
