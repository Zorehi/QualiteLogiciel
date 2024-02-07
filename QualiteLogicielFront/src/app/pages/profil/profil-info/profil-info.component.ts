import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Title} from "@angular/platform-browser";
import {Profil} from "../../../services/user.service";
import {InputFieldComponent} from "../../../components/input-field/input-field.component";

@Component({
  selector: 'app-profil-info',
  templateUrl: './profil-info.component.html',
  styleUrls: ['./profil-info.component.scss']
})
export class ProfilInfoComponent implements AfterViewInit {
  @ViewChild("button") button: ElementRef<HTMLButtonElement>
  @ViewChild("nom") nom: InputFieldComponent
  @ViewChild("prenom") prenom: InputFieldComponent
  @ViewChild("mail") mail: InputFieldComponent
  @ViewChild("matricule") matricule: InputFieldComponent
  profil: Profil = new Profil();

  constructor(private titleService: Title) {
    this.titleService.setTitle('Profil - LocaMat');
  }

  ngAfterViewInit() {
    this.nom.setDisabledState(true);
    this.prenom.setDisabledState(true);
    this.mail.setDisabledState(true);
    this.matricule.setDisabledState(true);
  }

  onClickModifier() {
    if (this.button.nativeElement.textContent == "Modifier") {
      this.nom.setDisabledState(false);
      this.prenom.setDisabledState(false);
      this.mail.setDisabledState(false);
      this.matricule.setDisabledState(false);
      this.button.nativeElement.textContent = "Enregistrer"
    } else {
      this.nom.setDisabledState(true);
      this.prenom.setDisabledState(true);
      this.mail.setDisabledState(true);
      this.matricule.setDisabledState(true);
      this.button.nativeElement.textContent = "Modifier"
      // Requete
    }
  }
}
