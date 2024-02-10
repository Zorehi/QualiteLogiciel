import {Component, ElementRef, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Title} from "@angular/platform-browser";
import {Profil} from "../../../services/user.service";
import {InputFieldComponent} from "../../../components/input-field/input-field.component";
import {Router} from "@angular/router";

const regMail:RegExp = new RegExp('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$');
const regMatricule:RegExp = new RegExp('^[a-zA-Z0-9]{7}$');
const regNom:RegExp = new RegExp('^[a-zA-ZÀ-ÖØ-öø-ÿçÇ\\-\']{1,30}$');
const regPrenom:RegExp = new RegExp('^[a-zA-ZÀ-ÖØ-öø-ÿçÇ\\-\']{1,30}$');

@Component({
  selector: 'app-profil-add',
  templateUrl: './profil-add.component.html',
  styleUrls: ['./profil-add.component.scss']
})
export class ProfilAddComponent {
  @ViewChild("button") button: ElementRef<HTMLButtonElement>
  @ViewChild("nom") nom: InputFieldComponent
  @ViewChild("prenom") prenom: InputFieldComponent
  @ViewChild("mail") mail: InputFieldComponent
  @ViewChild("matricule") matricule: InputFieldComponent
  profil: Profil = new Profil()
  materielForm: FormGroup;

  constructor(private fb: FormBuilder,
              private router: Router,
              private title: Title) {
    this.title.setTitle('Ajouter un profil | LocaMat');
    this.materielForm = this.fb.group({
      nom: ["", [Validators.required]],
      prenom: ["", [Validators.required]],
      mail: ["", [Validators.required]],
      matricule: ["", [Validators.required]],
      image: [""]
    });
  }

  /**
   * clic sur le bouton 'Ajouter' pour creer un nouvel utilisateur
   */
  onClickAjouter() {
    // verifier la validite des infos et insert
    const nom: string = this.materielForm.controls["nom"].value;
    const prenom: string = this.materielForm.controls["prenom"].value;
    const mail: string = this.materielForm.controls["mail"].value;
    const matricule: string = this.materielForm.controls["matricule"].value;
    const select:HTMLSelectElement = <HTMLSelectElement>document.getElementById("role-select");
    const role = select.value;

    // validite du champ 'Nom'
    if (nom.length == 0)
      window.alert("Nom de famille de l'employé manquant");
    else if (!regNom.test(nom))
      window.alert("Format de nom de famille invalide");
    // validite du champ 'Prenom'
    else if (prenom.length == 0)
      window.alert("Prenom de l'employé manquant");
    else if (!regPrenom.test(prenom))
      window.alert("Format de prenom invalide");
    // validite du champ 'Mail'
    else if (mail.length == 0)
      window.alert("Adresse mail de l'employé manquante");
    else if (!regMail.test(mail))
      window.alert("Format d'adresse mail invalide");
    // validite du champ 'Matricule'
    else if (matricule.length == 0)
      window.alert("Matricule de l'employé manquant");
    else if (!regMatricule.test(matricule))
      window.alert("Format de matricule invalide");
    // choix du role d'utilisateur
    else if (role.length == 0)
      window.alert("Role de l'utilisateur manquant");
    else if (role == "emprunteur" || window.confirm("Voulez-vous vraiment donner le role d'administrateur à cette personne ?"))
      window.alert("tous les champs sont valides, suite en construction...");
      // TODO essayer d'insert puis alert/navigate
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
