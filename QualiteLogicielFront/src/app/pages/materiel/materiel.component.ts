import {Component, ElementRef, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-materiel',
  templateUrl: './materiel.component.html',
  styleUrls: ['./materiel.component.scss']
})
export class MaterielComponent {
  @ViewChild("button") button: ElementRef<HTMLButtonElement>
  materielForm: FormGroup
  constructor(private fb: FormBuilder) {
    this.materielForm = this.fb.group({
      ID: ["", [Validators.required]],
      nom: ["", [Validators.required]],
      version: ["", [Validators.required]],
      ref: ["", [Validators.required]],
      img: ["", [Validators.required]],
      num: ["", [Validators.required]]
    })
  }

  onClickModifier() {
    if (this.button.nativeElement.textContent == "Modifier") {
      this.materielForm.controls["nom"].enable();
      this.materielForm.controls["prenom"].enable();
      this.materielForm.controls["mail"].enable();
      this.materielForm.controls["matricule"].enable();
      this.button.nativeElement.textContent = "Enregistrer"
    } else {
      this.materielForm.controls["nom"].disable();
      this.materielForm.controls["prenom"].disable();
      this.materielForm.controls["mail"].disable();
      this.materielForm.controls["matricule"].disable();
      this.button.nativeElement.textContent = "Modifier"
      // Requete
    }
  }

}
