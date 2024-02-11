import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Title} from "@angular/platform-browser";
import {Profil, UserService} from "../../../services/user.service";
import {Router} from "@angular/router";
import {Role, RoleService} from "../../../services/role.service";

const regMail: RegExp = new RegExp('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$');
const regMatricule: RegExp = new RegExp('^[a-zA-Z0-9]{7}$');
const regNom: RegExp = new RegExp('^[a-zA-ZÀ-ÖØ-öø-ÿçÇ\\-\']{1,30}$');
const regPrenom: RegExp = new RegExp('^[a-zA-ZÀ-ÖØ-öø-ÿçÇ\\-\']{1,30}$');

@Component({
  selector: 'app-profil-add',
  templateUrl: './profil-add.component.html',
  styleUrls: ['./profil-add.component.scss']
})
export class ProfilAddComponent implements OnInit {

  profil: Profil = new Profil()
  profilForm: FormGroup;
  Roles: Role[] = [];

  constructor(private fb: FormBuilder,
              private router: Router,
              private title: Title,
              private roleService: RoleService,
              private usersService: UserService) {
    this.title.setTitle('Ajouter un profil | LocaMat');
    this.profilForm = this.fb.group({
      nom: ["", [Validators.required, Validators.pattern(regNom)]],
      prenom: ["", [Validators.required, Validators.pattern(regPrenom)]],
      email: ["", [Validators.required, Validators.pattern(regMail)]],
      matricule: ["", [Validators.required, Validators.pattern(regMatricule)]],
      role: ["", [Validators.required]],
    });
  }

  ngOnInit() {
    this.roleService.GetAllRoles().subscribe((roles) => {
      this.Roles = roles;
    });
  }

  /**
   * clic sur le bouton 'Ajouter' pour creer un nouvel utilisateur
   */
  onClickAjouter() {
    // verifier la validite des infos et insert
    const profil: Profil = {
      usersId: 0,
      firstname: this.profilForm.controls["prenom"].value,
      lastname: this.profilForm.controls["nom"].value,
      email: this.profilForm.controls["email"].value,
      matricule: this.profilForm.controls["matricule"].value,
      role: this.profilForm.controls["role"].value,
      password: "",
      firstConnection: true
    }

    // validite du champ 'Nom'
    if (profil.lastname.length == 0)
      window.alert("Nom de famille de l'employé manquant");
    else if (!regNom.test(profil.lastname))
      window.alert("Format de nom de famille invalide");
    // validite du champ 'Prenom'
    else if (profil.firstname.length == 0)
      window.alert("Prenom de l'employé manquant");
    else if (!regPrenom.test(profil.firstname))
      window.alert("Format de prenom invalide");
    // validite du champ 'Mail'
    else if (profil.email.length == 0)
      window.alert("Adresse mail de l'employé manquante");
    else if (!regMail.test(profil.email))
      window.alert("Format d'adresse mail invalide");
    // validite du champ 'Matricule'
    else if (profil.matricule.length == 0)
      window.alert("Matricule de l'employé manquant");
    else if (!regMatricule.test(profil.matricule))
      window.alert("Format de matricule invalide");
    // choix du role d'utilisateur
    else if (profil.role.name.length == 0)
      window.alert("Role de l'utilisateur manquant");
    else if (profil.role.roleId == 1 || window.confirm("Voulez-vous vraiment donner le role d'administrateur à cette personne ?"))
    this.usersService.PutProfil(profil).subscribe(() => {
      window.alert("Profil ajouté avec succès");
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
