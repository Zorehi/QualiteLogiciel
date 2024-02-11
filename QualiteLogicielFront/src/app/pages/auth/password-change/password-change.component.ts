import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Title} from "@angular/platform-browser";

const regPassword: RegExp = new RegExp('^.{4,128}$');

@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.component.html',
  styleUrls: ['./password-change.component.scss']
})
export class PasswordChangeComponent {
  changePasswordForm: FormGroup

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private route: Router,
              private titleService: Title) {
    this.titleService.setTitle('Changement de mot de passe - LocaMat');
    this.changePasswordForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.pattern(regPassword)]],
      confirmNewPassword: ['', [Validators.required, Validators.pattern(regPassword)]]
    })
  }

  onCLickContinuer() {
    const newPassword: string = this.changePasswordForm.controls['newPassword'].value
    const confirmNewPassword: string = this.changePasswordForm.controls['confirmNewPassword'].value

    if (newPassword == confirmNewPassword) {
      this.authService.PatchPassword(this.authService.AuthenticatedUser.usersId, newPassword).subscribe(data => {
        this.route.navigate(['accueil']);
      })
    } else {
      alert("Les mots de passe ne sont pas identiques");
    }
  }
}
