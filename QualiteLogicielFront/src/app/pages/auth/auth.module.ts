import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInComponent } from './sign-in/sign-in.component';
import { PasswordChangeComponent } from './password-change/password-change.component';
import {RouterLink, RouterModule, Routes} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ComponentsModule} from "../../components/components.module";
import {AuthGuard} from "../../auth.guard";

const authRoutes: Routes = [
  { path: 'auth/sign-in', component: SignInComponent },
  { path: 'auth/password-change', component: PasswordChangeComponent, canActivate: [AuthGuard] }
]

@NgModule({
  declarations: [
    SignInComponent,
    PasswordChangeComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(authRoutes),
    RouterLink,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule
  ]
})
export class AuthModule { }
