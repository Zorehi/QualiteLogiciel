import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent {
  changePasswordForm: FormGroup

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private route: Router,
              private activatedRoute: ActivatedRoute) {
    this.changePasswordForm = this.fb.group({
      newPassword: ['', Validators.required],
      confirmNewPassword: ['', Validators.required]
    })
  }

  onCLickContinuer() {
    const newPassword: string = this.changePasswordForm.controls['newPassword'].value
    const confirmNewPassword: string = this.changePasswordForm.controls['confirmNewPassword'].value

    if (newPassword == confirmNewPassword) {
      const idRouted = this.activatedRoute.snapshot.paramMap.get('id');
      const idUser = idRouted ? +idRouted : 0;
      this.authService.PatchPassword(idUser, newPassword).subscribe(data => {
        if (data) {
          this.route.navigate(['accueil']);
        }
      })
    } else {

    }
  }
}
