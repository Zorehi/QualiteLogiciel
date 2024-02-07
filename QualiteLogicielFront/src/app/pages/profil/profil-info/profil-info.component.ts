import {Component, ElementRef, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-profil-info',
  templateUrl: './profil-info.component.html',
  styleUrls: ['./profil-info.component.scss']
})
export class ProfilInfoComponent {
  @ViewChild("button") button: ElementRef<HTMLButtonElement>
  profilForm: FormGroup
  constructor(private fb: FormBuilder,
              private titleService: Title) {
    this.titleService.setTitle('Profil - LocaMat');
    this.profilForm = this.fb.group({
      nom: ["", [Validators.email]],
      prenom: ["", [Validators.required]],
      mail: ["", [Validators.required, Validators.required]],
      matricule: ["", [Validators.required]],
    })

    this.profilForm.controls["nom"].disable();
    this.profilForm.controls["prenom"].disable();
    this.profilForm.controls["mail"].disable();
    this.profilForm.controls["matricule"].disable();
  }

  onClickModifier() {
    if (this.button.nativeElement.textContent == "Modifier") {
      this.profilForm.controls["nom"].enable();
      this.profilForm.controls["prenom"].enable();
      this.profilForm.controls["mail"].enable();
      this.profilForm.controls["matricule"].enable();
      this.button.nativeElement.textContent = "Enregistrer"
    } else {
      this.profilForm.controls["nom"].disable();
      this.profilForm.controls["prenom"].disable();
      this.profilForm.controls["mail"].disable();
      this.profilForm.controls["matricule"].disable();
      this.button.nativeElement.textContent = "Modifier"
      // Requete
    }
  }
}
