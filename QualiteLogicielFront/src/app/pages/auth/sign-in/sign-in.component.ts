import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../../services/auth.service";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {
  connexionForm: FormGroup;
  constructor(private fb: FormBuilder,
              private router: Router,
              private authService: AuthService,
              private titleService: Title) {
    this.titleService.setTitle('Connexion - LocaMat');
    this.connexionForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', Validators.required]
    })
  }

  onClickConnexion() {
    let email: string = this.connexionForm.controls['email'].value;
    let password: string = this.connexionForm.controls['password'].value;
    this.authService.PostLogin(email, password).subscribe(data => {
      if (data.success) {
        this.authService.IsAuthenticated = true;
        this.authService.AuthenticatedUser = data.user;
        if (data.firstConnection) {
          this.router.navigate(['auth', 'password-change']);
        } else {
          this.router.navigate(['accueil']);
        }
      }
    })
  }
}
