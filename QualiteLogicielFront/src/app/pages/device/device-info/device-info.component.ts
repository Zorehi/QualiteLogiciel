import {Component, ElementRef, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-materiel-info',
  templateUrl: './device-info.component.html',
  styleUrls: ['./device-info.component.scss']
})
export class DeviceInfoComponent {
  @ViewChild("button") button: ElementRef<HTMLButtonElement>
  materielForm: FormGroup
  constructor(private fb: FormBuilder,
              private titleService: Title) {
    this.titleService.setTitle('Materiel informations - LocaMat');
    this.materielForm = this.fb.group({
      ID: ["", [Validators.required]],
      nom: ["", [Validators.required]],
      version: ["", [Validators.required]],
      ref: ["", [Validators.required]],
      img: ["", [Validators.required]],
      num: ["", [Validators.required]]
    });

    this.materielForm.controls["ID"].disable();
    this.materielForm.controls["nom"].disable();
    this.materielForm.controls["version"].disable();
    this.materielForm.controls["ref"].disable();
    this.materielForm.controls["num"].disable();
  }

  onClickModifier() {
    if (this.button.nativeElement.textContent == "Modifier") {
      this.materielForm.controls["ID"].enable();
      this.materielForm.controls["nom"].enable();
      this.materielForm.controls["version"].enable();
      this.materielForm.controls["ref"].enable();
      this.materielForm.controls["num"].enable();
      this.button.nativeElement.textContent = "Enregistrer"
    } else {
      this.materielForm.controls["ID"].disable();
      this.materielForm.controls["nom"].disable();
      this.materielForm.controls["version"].disable();
      this.materielForm.controls["ref"].disable();
      this.materielForm.controls["num"].disable();
      this.button.nativeElement.textContent = "Modifier"
      // Requete
    }
  }
}
