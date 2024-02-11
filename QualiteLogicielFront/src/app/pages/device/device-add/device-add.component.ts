import {Component, ElementRef, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {Device, DeviceService} from "../../../services/device.service";

const regNomObjet: RegExp = new RegExp('^[^\\n\\r\\t\\v\\f]{1,30}$');
const regVersion: RegExp = new RegExp('^[a-zA-Z0-9.]{3,15}$');
const regReference: RegExp = new RegExp('^(AN|AP|XX)\\d{3}$');
const regNum: RegExp = new RegExp('^\\d{10}$');

@Component({
  selector: 'app-materiel-add',
  templateUrl: './device-add.component.html',
  styleUrls: ['./device-add.component.scss']
})
export class DeviceAddComponent {
  deviceForm: FormGroup
  selectedFile: File | undefined | null = undefined;

  constructor(private fb: FormBuilder,
              private router: Router,
              private title: Title,
              private deviceService: DeviceService) {
    this.title.setTitle("Ajouter un appareil | LocaMat");
    this.deviceForm = this.fb.group({
      nom: ["", [Validators.required, Validators.pattern(regNomObjet)]],
      version: ["", [Validators.required, Validators.pattern(regVersion)]],
      ref: ["", [Validators.required, Validators.pattern(regReference)]],
      num: ["", [Validators.pattern(regNum)]],
      image: [""]
    });
  }

  onFileSelected(event: Event) {
    this.selectedFile = (event?.target as HTMLInputElement)?.files?.item(0);
  }

  onClickAjouter() {
    // verifier la validite des infos et insert
    const device: Device = {
      deviceId: 0,
      name: this.deviceForm.controls["nom"].value,
      version: this.deviceForm.controls["version"].value,
      deviceRef: this.deviceForm.controls["ref"].value,
      phoneNumber: this.deviceForm.controls["num"].value,
      image: this.selectedFile ? this.selectedFile : undefined
    };

    // HELP je ne sais pas comment recuperer le contenu du fichier image
    if (device.name.length == 0)
      window.alert("Nom de l'appareil manquant");
    else if (!regNomObjet.test(device.name))
      window.alert("Format de nom d'appareil invalide");
    else if (device.version.length == 0)
      window.alert("Version de l'appareil manquante");
    else if (!regVersion.test(device.version))
      window.alert("Format de version d'appareil invalide");
    else if (device.deviceRef.length == 0)
      window.alert("Référence de l'appareil manquante");
    else if (!regReference.test(device.deviceRef))
      window.alert("Format de reference d'appareil invalide");

    this.deviceService.PutDevice(device).subscribe(() => {
      window.alert("Appareil ajouté avec succès");
      this.router.navigate(["accueil"]);
    });
  }

  /**
   * j'ai ajoute ce bouton equivalent a '<' mais il n'est pas dans les specifs
   */
  onClickAnnuler() {
    // if (infos entrees) ?
    if (confirm("Voulez-vous vraiment annuler et perdre les informations entrées ?")) {
      // remplacer par "./recherche" quand cette page existera
      //window.location.href = "./accueil";
      this.router.navigate(["accueil"]);
    }
  }
}
