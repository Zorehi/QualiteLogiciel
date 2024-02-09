import {Component, ElementRef, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

const regNomObjet:RegExp = new RegExp('^[^\\n\\r\\t\\v\\f]{1,30}$');
const regVersion:RegExp = new RegExp('^[a-zA-Z0-9.]{3,15}$');
const regReference:RegExp = new RegExp('^(AN|AP|XX)\\d{3}$');

@Component({
  selector: 'app-nouveau-materiel',
  templateUrl: './nouveau-materiel.component.html',
  styleUrls: ['./nouveau-materiel.component.scss']
})
export class NouveauMaterielComponent {
  @ViewChild("button") button: ElementRef<HTMLButtonElement>
  materielForm: FormGroup
  constructor(private fb: FormBuilder) {
    this.materielForm = this.fb.group({
      nom: ["", [Validators.required]],
      version: ["", [Validators.required]],
      ref: ["", [Validators.required]],
      image: ["", [Validators.required]]
    });
  }

  onClickAjouter() {
    // verifier la validite des infos et insert
    const nom: string = this.materielForm.controls["nom"].value;
    const ver: string = this.materielForm.controls["version"].value;
    const ref:string = this.materielForm.controls["ref"].value;
    // HELP je ne sais pas comment recuperer le contenu du fichier image
    if (nom.length == 0)
      window.alert("Nom de l'appareil manquant");
    else if (!regNomObjet.test(nom))
      window.alert("Format de nom d'appareil invalide");
    else if (ver.length == 0)
      window.alert("Version de l'appareil manquante");
    else if (!regVersion.test(ver))
      window.alert("Format de version d'appareil invalide");
    else if (ref.length == 0)
      window.alert("Référence de l'appareil manquante");
    else if (!regReference.test(ref))
      window.alert("Format de reference d'appareil invalide");
    else
      window.alert("nom, ref, version valides, suite en construction...");
  }

  /**
   * j'ai ajoute ce bouton equivalent a '<' mais il n'est pas dans les specifs
   */
  onClickAnnuler() {
    // if (infos entrees) ?
    if (confirm("Voulez-vous vraiment annuler et perdre les informations entrées ?")) {
      // remplacer par "./recherche" quand cette page existera
      window.location.href = "./accueil";
    }
  }
}

