import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Title} from "@angular/platform-browser";

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
      newPassword: ['', Validators.required],
      confirmNewPassword: ['', Validators.required]
    })
  }

  onCLickContinuer() {
    const newPassword: string = this.changePasswordForm.controls['newPassword'].value
    const confirmNewPassword: string = this.changePasswordForm.controls['confirmNewPassword'].value

    if (newPassword == confirmNewPassword) {
      this.authService.PatchPassword(this.authService.AuthenticatedUser.usersId, newPassword).subscribe(data => {
        if (data) {
          this.route.navigate(['accueil']);
        }
      })
    } else {
      alert("Les mots de passe ne sont pas identiques");
    }
  }
}
