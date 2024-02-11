import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Title} from "@angular/platform-browser";
import {Profil, UserService} from "../../../services/user.service";
import {InputFieldComponent} from "../../../components/input-field/input-field.component";
import {ActivatedRoute, Route, Router} from "@angular/router";
import {Role, RoleService} from "../../../services/role.service";
import {AuthService} from "../../../services/auth.service";
import {Book, Device, DeviceService} from "../../../services/device.service";

const regMail: RegExp = new RegExp('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$');
const regMatricule: RegExp = new RegExp('^[a-zA-Z0-9]{7}$');
const regNom: RegExp = new RegExp('^[a-zA-ZÀ-ÖØ-öø-ÿçÇ\\-\']{1,30}$');
const regPrenom: RegExp = new RegExp('^[a-zA-ZÀ-ÖØ-öø-ÿçÇ\\-\']{1,30}$');

@Component({
  selector: 'app-profil-info',
  templateUrl: './profil-info.component.html',
  styleUrls: ['./profil-info.component.scss']
})
export class ProfilInfoComponent implements AfterViewInit, OnInit {
  @ViewChild("button") button: ElementRef<HTMLButtonElement>

  profilForm: FormGroup;
  profil: Profil = new Profil();
  Roles: Role[] = [];
  bookList: Book[] = [];
  displayedColumns: string[] = ['deviceName', 'deviceRef', 'startDate', 'endDate'];

  constructor(private titleService: Title,
              private fb: FormBuilder,
              private usersService: UserService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private roleService: RoleService,
              public authService: AuthService,
              private deviceService: DeviceService) {
    this.profilForm = this.fb.group({
      nom: ['', Validators.required, Validators.pattern(regNom)],
      prenom: ['', Validators.required, Validators.pattern(regPrenom)],
      email: ['', [Validators.required, Validators.pattern(regMail)]],
      matricule: ['', Validators.required, Validators.pattern(regMatricule)],
      role: ['', Validators.required]
    })
    this.titleService.setTitle('Profil - LocaMat');
    this.roleService.GetAllRoles().subscribe(data => {
      if (data) {
        this.Roles = data;
      }
    });
  }

  ngOnInit(): void {
    let IdRouted = this.activatedRoute.snapshot.params['id'];
    let idUser = IdRouted ? Number.parseInt(IdRouted) : 0;
    if (idUser) {
      this.usersService.GetProfilById(idUser).subscribe(data => {
        if (data) {
          this.profil = data;
          this.profilForm.controls["nom"].setValue(this.profil.lastname);
          this.profilForm.controls["prenom"].setValue(this.profil.firstname);
          this.profilForm.controls["email"].setValue(this.profil.email);
          this.profilForm.controls["matricule"].setValue(this.profil.matricule);
          this.profilForm.controls["role"].setValue(this.Roles.find(role => role.roleId == this.profil.role.roleId));
        }
      });
      this.deviceService.GetBookByUsersId(idUser).subscribe(data => {
        if (data) {
          this.bookList = data;
        }
      })
    } else {
      this.router.navigate(['accueil']);
    }
  }

  ngAfterViewInit() {
    this.profilForm.controls["nom"].disable();
    this.profilForm.controls["prenom"].disable();
    this.profilForm.controls["email"].disable();
    this.profilForm.controls["matricule"].disable();
    this.profilForm.controls["role"].disable();
  }

  onClickModifier() {
    if (this.button.nativeElement.textContent == "Modifier") {
      this.profilForm.controls["nom"].enable();
      this.profilForm.controls["prenom"].enable();
      this.profilForm.controls["email"].enable();
      this.profilForm.controls["matricule"].enable();
      this.profilForm.controls["role"].enable();
      this.button.nativeElement.textContent = "Enregistrer"
    } else {
      this.profilForm.controls["nom"].disable();
      this.profilForm.controls["prenom"].disable();
      this.profilForm.controls["email"].disable();
      this.profilForm.controls["matricule"].disable();
      this.profilForm.controls["role"].disable();
      this.button.nativeElement.textContent = "Modifier"
      // Requete
      let profil: Profil = {
        firstConnection: this.profil.firstConnection,
        password: this.profil.password,
        usersId: this.profil.usersId,
        lastname: this.profilForm.controls["nom"].value,
        firstname: this.profilForm.controls["prenom"].value,
        email: this.profilForm.controls["email"].value,
        matricule: this.profilForm.controls["matricule"].value,
        role: this.profilForm.controls["role"].value
      }
      this.usersService.PatchProfil(profil).subscribe(data => {
        this.profil = profil;
        if (profil.usersId == this.authService.AuthenticatedUser.usersId) {
          this.authService.AuthenticatedUser = profil;
        }
        alert("Profil modifié");
      });
    }
  }

  onClickSupprimer() {
    if (confirm("Voulez-vous vraiment supprimer cet utilisateur ?")) {
      this.usersService.DeleteProfil(this.profil.usersId).subscribe(data => {
        this.router.navigate(['profil', 'search', '']);
      });
    }
  }

  onClickRow(book: Book) {
    this.router.navigate(['device', 'info', book.device.deviceId]);
  }
}
