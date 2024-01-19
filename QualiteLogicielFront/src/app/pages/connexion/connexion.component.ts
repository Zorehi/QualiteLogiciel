import {Component, ElementRef, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatIcon} from "@angular/material/icon";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {catchError, of} from "rxjs";

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss']
})
export class ConnexionComponent {
  connexionForm: FormGroup;
  constructor(private fb: FormBuilder,
              private router: Router,
              private authService: AuthService) {
    this.connexionForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', Validators.required]
    })
  }

  onClickConnexion() {
    let email: string = this.connexionForm.controls['email'].value;
    let password: string = this.connexionForm.controls['password'].value;
    this.authService.PostLogin(email, password).subscribe(data => {
      if (data) {
        this.router.navigate(['change-password']);
      }
    })
  }
}
